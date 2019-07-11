import os, re
from shutil import copy2 as cpy_file
from colors import *

def main():
    all_icons = []
    curr_icons = []
    missing_icons = []

    ### EDITING THE ICON FOLDER ###
    with open('../icons/icon_list.txt') as icon_list_file:
        all_icons = icon_list_file.read()[1:].split('\n*')

    os.chdir('../icons/')
    for d in os.listdir():
        if d in 'base|icon_list.txt|info.txt'.split('|'):
            continue

        if os.path.isdir(d) and os.path.isfile(f'{d}/regular.svg'):
            curr_icons.append(d)
        else:
            missing_icons.append(d)

    print(f'\n\nLooking for the {paint("current icons", "blue")}:')
    for curr in curr_icons:
        if ('-' in curr):
            os.rename(curr, curr[1:])
            curr_icons[curr_icons.index(curr)] = curr[1:]
            print(f'\t> The icon "{paint(curr[1:], "green")}" has been added.')

    print(f'\nLooking for {paint("mising icons", "blue")}:')
    for miss in missing_icons:
        if ('-' not in miss):
            os.rename(miss, '-' + miss)
            print(f'\t> The icon "{paint(miss, "green")}" has been removed.')
        else:
            missing_icons[missing_icons.index(miss)] = miss[1:]

    print(f'\nLooking for {paint("new icons", "blue")} to create:')
    for icon in all_icons:
        if (icon not in curr_icons) and (icon not in missing_icons):
            os.mkdir(f'-{icon}')
            cpy_file('base/icon.psd', f'-{icon}/')
            missing_icons.append(icon)
            print(f'\t> The new icon "{paint(curr[1:], "green")}" has been created.')

    ### EDITING THE INDEX.HTML ###
    index_file = ""
    
    with open('../../index.html') as file:
        index_file = file.read()

    print(f'\nUpdating icon counter in {paint("index.html", "blue")}:')
    with open('../../index.html', 'w') as file:
        regex = r'<!--ICON_COUNT-->icons: \d+ / \d+<!--ICON_COUNT-->'
        repl = (f'<!--ICON_COUNT-->icons: {len(curr_icons)} / '
                + f'{len(all_icons)}<!--ICON_COUNT-->')
        
        file.write(re.sub(regex, repl, index_file))
    
    print('\nDone.')


if __name__ == '__main__':
    main()
