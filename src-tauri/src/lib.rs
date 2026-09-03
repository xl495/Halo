use tauri::{
    image::Image,
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WindowEvent,
};

fn show_settings(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn show_widget(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("widget") {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn clear_widget_background(app: &tauri::AppHandle) {
    if let Some(widget) = app.get_webview_window("widget") {
        let _ = widget.set_background_color(Some(tauri::window::Color(0, 0, 0, 0)));
        #[cfg(target_os = "macos")]
        macos_clear_window(&widget);
        #[cfg(windows)]
        {
            let _ = window_vibrancy::apply_acrylic(&widget, Some((0, 0, 0, 0)))
                .or_else(|_| window_vibrancy::apply_blur(&widget, Some((0, 0, 0, 0))));
        }
    }
}

#[cfg(target_os = "macos")]
fn macos_clear_window(window: &tauri::WebviewWindow) {
    use objc::runtime::{Object, BOOL, NO, YES};
    use objc::{class, msg_send, sel, sel_impl};

    unsafe {
        let Ok(ns_window) = window.ns_window() else { return };
        let ns_window = ns_window as *mut Object;
        let clear: *mut Object = msg_send![class!(NSColor), clearColor];
        let no: BOOL = NO;
        let yes: BOOL = YES;
        let _: () = msg_send![ns_window, setOpaque: no];
        let _: () = msg_send![ns_window, setBackgroundColor: clear];
        let _: () = msg_send![ns_window, setHasShadow: no];

        let Ok(ns_view) = window.ns_view() else { return };
        clear_nsview(ns_view as *mut Object, clear, yes, no);
    }
}

#[cfg(target_os = "macos")]
unsafe fn clear_nsview(
    view: *mut objc::runtime::Object,
    clear: *mut objc::runtime::Object,
    yes: objc::runtime::BOOL,
    no: objc::runtime::BOOL,
) {
    use objc::runtime::{Object, BOOL};
    use objc::{class, msg_send, sel, sel_impl};
    use std::ffi::CString;

    if view.is_null() {
        return;
    }

    let _: () = msg_send![view, setWantsLayer: yes];
    let _: () = msg_send![view, setOpaque: no];
    let layer: *mut Object = msg_send![view, layer];
    if !layer.is_null() {
        let cg: *mut Object = msg_send![clear, CGColor];
        let _: () = msg_send![layer, setOpaque: no];
        let _: () = msg_send![layer, setBackgroundColor: cg];
    }

    let wk: BOOL = msg_send![view, isKindOfClass: class!(WKWebView)];
    if wk == yes {
        let key = CString::new("drawsBackground").unwrap();
        let ns_key: *mut Object =
            msg_send![class!(NSString), stringWithUTF8String: key.as_ptr()];
        let num: *mut Object = msg_send![class!(NSNumber), numberWithBool: no];
        let _: () = msg_send![view, setValue: num forKey: ns_key];
        let _: () = msg_send![view, setUnderPageBackgroundColor: clear];
    }

    let subviews: *mut Object = msg_send![view, subviews];
    if subviews.is_null() {
        return;
    }
    let count: usize = msg_send![subviews, count];
    for i in 0..count {
        let sub: *mut Object = msg_send![subviews, objectAtIndex: i];
        clear_nsview(sub, clear, yes, no);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            clear_widget_background(handle);
            let settings_item = MenuItem::with_id(handle, "settings", "设置", true, None::<&str>)?;
            let show_item = MenuItem::with_id(handle, "show", "显示计时器", true, None::<&str>)?;
            let quit_item = MenuItem::with_id(handle, "quit", "退出", true, None::<&str>)?;
            let menu = Menu::with_items(handle, &[&settings_item, &show_item, &quit_item])?;

            let mut tray = TrayIconBuilder::new()
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "settings" => show_settings(app),
                    "show" => show_widget(app),
                    "quit" => app.exit(0),
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        show_settings(tray.app_handle());
                    }
                });

            if let Ok(icon) = Image::from_bytes(include_bytes!("../icons/icon.png")) {
                tray = tray.icon(icon);
            }

            tray.build(handle)?;
            Ok(())
        })
        .on_window_event(|window, event| {
            if window.label() == "settings" {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    let _ = window.hide();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running Halo");
}
