import os, re
from shutil import copy2 as cpy_file
from colorparse import paint

def main():
    all_icons = []
    curr_icons = []
    missing_icons = []
    index_file = ""
    index_icon_list_string = "\n"
    html_tags = ['\t\t<a role="button" class="btn btn-light" href="../index.html" style="margin-right: 1rem; margin-bottom: 1rem;"><img src="../src/icons/{0}/regular.svg"></a>',
                 '\t\t<a role="button" class="btn btn-light" href="../index.html" style="margin-right: 4rem; margin-bottom: 1rem;"><img src="../src/icons/{0}/filled.svg"></a>']

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

    paint('\n\nLooking for ;C/current icons[;:]:')
    for n, curr in enumerate(curr_icons):            
        if ('-' in curr):
            os.rename(curr, curr[1:])
            curr_icons[n] = curr[1:]
            paint(f'\t> The icon "[;G]{curr[1:]}[;:]" has been added.')

        index_icon_list_string += f'{html_tags[0].format(curr_icons[n])}\n{html_tags[1].format(curr_icons[n])}\n\n'

        if (n + 1) % 4 == 0:
            index_icon_list_string += '\t\t<br>\n\n'
        

    paint('\nLooking for ;Cmissing icons[;:]:')
    for miss in missing_icons:
        if ('-' not in miss):
            os.rename(miss, '-' + miss)
            paint(f'\t> The icon "[;G]{miss}[;:]" has been removed.')
            
        else:
            missing_icons[missing_icons.index(miss)] = miss[1:]

    paint('\nLooking for ;Cnew icons[;:] to create:')
    for n, icon in enumerate(all_icons):            
        if (icon not in curr_icons) and (icon not in missing_icons):
            os.mkdir(f'-{icon}')
            cpy_file('base/icon.psd', f'-{icon}/')
            missing_icons.append(icon)
            paint(f'\t> The new icon "[;G]{icon}[;:]" has been created.')

    ### EDITING THE INDEX.HTML ###
    started = False
    with open('../../tabs/icon-list.html') as file:
        index_file = file.read()
            

    paint('\nUpdating icon counter in ;Cindex.html[;:]:')
    with open('../../tabs/icon-list.html', 'w') as file:
        regex_icon_count = r'<!--N_ICONS-->\d+<!--N_ICONS-->'
        repl_icon_count = (f'<!--N_ICONS-->{len(all_icons)}<!--N_ICONS-->')

        regex_icon_list = r'(?<=<!--ICON_LIST-->)[.\s\w<>=\"\-:;/]*(?=<!--ICON_LIST-->)'
        
        index_file = re.sub(regex_icon_count, repl_icon_count, index_file)
        index_file = re.sub(regex_icon_list, index_icon_list_string[:-1], index_file)
        
        file.write(index_file)
    
    print('\nDone.')


if __name__ == '__main__':
    main()
