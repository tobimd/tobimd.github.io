import os, re
from shutil import copy2 as cpy_file
from colors import *

def main():
    all_icons = []
    curr_icons = []
    missing_icons = []
    index_file = ""
    index_icon_list_string = ""
    html_tags = ['\t\t<a role="button" class="btn btn-light" href="index.html" style="margin-right: 1rem; margin-bottom: 1rem;"><img src="src/icons/{0}/regular.svg"></a>',
                 '\t\t<a role="button" class="btn btn-light" href="index.html" style="margin-right: 4rem; margin-bottom: 1rem;"><img src="src/icons/{0}/filled.svg"></a>']

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

    print(f'\n\nLooking for {paint("current icons", "blue")}:')
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
    for n, icon in enumerate(all_icons):
        index_icon_list_string +=f'{html_tags[0].format(icon)}\n{html_tags[1].format(icon)}\n\n'

        if (n + 1) % 4 == 0:
            index_icon_list_string += '\t\t<br>\n\n'
            
        if (icon not in curr_icons) and (icon not in missing_icons):
            os.mkdir(f'-{icon}')
            cpy_file('base/icon.psd', f'-{icon}/')
            missing_icons.append(icon)
            print(f'\t> The new icon "{paint(icon, "green")}" has been created.')

    ### EDITING THE INDEX.HTML ###
    started = False
    with open('../../index.html') as file:
        index_file = file.read()
            

    print(f'\nUpdating icon counter in {paint("index.html", "blue")}:')
    with open('../../index.html', 'w') as file:
        regex_icon_count = r'<!--ICON_COUNT-->icons: \d+ / \d+<!--ICON_COUNT-->'
        repl_icon_count = (f'<!--ICON_COUNT-->icons: {len(curr_icons)} / '
                + f'{len(all_icons)}<!--ICON_COUNT-->')

        regex_icon_list = r'(?<=<!--ICON_LIST-->)[.\s\w<>=\"\-:;/]*(?=<!--ICON_LIST-->)'
        
        index_file = re.sub(regex_icon_count, repl_icon_count, index_file)
        index_file = re.sub(regex_icon_list, index_icon_list_string[:-1], index_file)
        
        file.write(index_file)
    
    print('\nDone.')


if __name__ == '__main__':
    main()
