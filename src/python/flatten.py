def add_to_hex(value):
    n = 1
    l = {"e95d":2, "e95f":7, "e967":3, "e96c":2, "e970":2, "e977":2, "e984":7}
    if value in l:
        n = l[value]
    return hex(int(value, 16) + n)[2:]


def main():
    css = ".tb-{0}::before {{ content: \"{1}\"; }}"

    icons = ["bomb", "book", "calendar", "circle_checkbox_empty", 
    "circle_checkbox_false", "circle_checkbox_true", "clock", 
    "compass", "config_file", "controller", "database", "division_sign", 
    "download", "edit_file", "empty_file", "file_html", "file_md", 
    "file_pdf", "file_psd", "file_svg", "file_txt", "flag", "font", 
    "gear", "gmod", "h_battery_charging", "h_battery_empty", "h_battery_full",
    "h_battery_half", "h_battery_unknown", "h_battery_warning", "home",
    "image", "link", "menu", "mine", "minecraft", "minus_sign", "mushroom", 
    "music", "new_file", "panoramic_image", "pencil", "person_stand", 
    "person_lift", "person_yoga", "pi_symbol", "plus_sign", "remove_file", 
    "rubiks_cube", "tachometer", "timer", "times_sign", "trash", "triforce", 
    "square_checkbox_empty", "square_checkbox_false", "square_checkbox_true",
    "unicode", "upload", "user", "users", "v_battery_charging", "v_battery_empty", 
    "v_battery_half", "v_battery_full", "v_battery_unknown", "v_battery_warning", 
    "weight", "wheat", "written_file", "bomb", "book", "calendar", "circle_checkbox_empty", 
    "circle_checkbox_false", "circle_checkbox_true", "clock", 
    "compass", "config_file", "controller", "database", "division_sign", 
    "download", "edit_file", "empty_file", "file_html", "file_md", 
    "file_pdf", "file_psd", "file_svg", "file_txt", "flag", "font", "gmod",
    "home", "image", "mine", "minecraft", "minus_sign", "music", "new_file", "panoramic_image", 
    "person_stand", "person_lift", "person_yoga", "pi_symbol", "plus_sign", "remove_file",
    "tachometer", "timer", "times_sign", "trash", "triforce", 
    "square_checkbox_empty", "square_checkbox_false", "square_checkbox_true",
    "unicode", "upload", "user", "users", "weight", "wheat", "written_file"
   ]
    
    unique = ["h_battery_charging", "h_battery_empty", "h_battery_full",
     "h_battery_half", "h_battery_unknown", "h_battery_warning", "gear", "link", 
     "menu", "mushroom", "pencil", "rubiks_cube", "mushroom", "v_battery_charging",
     "v_battery_empty", "v_battery_half", "v_battery_full", "v_battery_unknown",
     "v_battery_warning"]

    index = 'e900'
    done = []

    for icon in icons:
        n = icon.replace("_", "-")
        if icon not in unique and icon not in done:
            print(css.format(n + "-f", index))
            done.append(icon)
            index = add_to_hex(index)
        
        elif icon not in unique:
            print(css.format(n + "-o", index))
            index = add_to_hex(index)

        else:
            print(css.format(n, index))
            index = add_to_hex(index)
            




if __name__ == '__main__':
    main()
