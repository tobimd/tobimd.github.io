import os, sys
from shutil import copy2
from colors import *


help_string = """\n\n ------------------------------ [ {0} ] ------------------------------ \n
This will edit {1} files, replacing "{2}" with "{3}" within each file.
To use it:

py -3.7 svg_formatting [ {4} | {5} ]

    * {4}: prints {6}.
    * {5}: shows the details folder by folder, stopping with each one.
""".format(paint('HELP'),
           paint('.svg'), paint('img'), paint('image'),
           paint('help', 'green'), paint('slow', 'green'),
           paint('this'))


def read(file):
    with open(file) as f:
        return f.read()


def main(slow):
    base_dir = 'D:/Documents/Github/tubi-carrillo.github.io/src/buttons/'
    icon_types = ['-default.svg', '-hover.svg',
                  '-click.svg', '-disabled.svg']
    
    os.system('color')
    os.chdir(base_dir)

    if slow:
        print('')
    
    for directory in os.listdir():
        if not slow:
            print('\n', end='')
            
        print(f'{paint("*", "yellow")} Working in "'
              + paint(directory, 'yellow', underline=True)
              + '"...')

        printed_lines = 2

        for icon_type in icon_types:
            file = f'{directory}/{directory}{icon_type}'

            if os.path.isfile(file):
                name, ext = os.path.splitext(file)

                if ext == '.svg':
                    icon_data = read(file)
                    if '"data:img/png;' in icon_data:
                        with open(file, 'w') as icon:
                            icon.write(icon_data.replace('"data:img/png;', '"data:image/png;'))

                        print(f'\tThe file "{paint(directory + icon_type, "green")}" '
                              + 'has been changed.')
                    else:
                        tmp = f'Nothing was changed in file "{directory}{icon_type}".'
                        print('\t' + paint(tmp, "dark_gray"))
                        
            elif icon_type == '-default.svg':
                print(f'\tFolder is {paint("empty")}.')
                printed_lines = 3
                break
                
            else:
                print(f'\tMissing file type "{paint(icon_type[1:-4], "red")}". Default copied.')
                copy2(f'{directory}/{directory}-default.svg', file)

            printed_lines += 1
                
        if slow:
            input(paint('\nPress enter to continue.', 'dark gray', underline=True, reverse=True))
            print(f'\033[0D\033[1A\033[K', end='')

            for i in range(printed_lines):
                print('\033[1A\033[K', end='')

    if slow:
        print('\033[1A\033[K\033[2A')
    else:
        print('\033[1A')
                

if __name__ == '__main__':
    argv = sys.argv[1:]
    argc = len(argv)
    
    if argc == 1 and argv[0] == 'help':
        print(help_string)
        
    else:  
        main(argc == 1 and argv[0] == 'slow')
        
        
