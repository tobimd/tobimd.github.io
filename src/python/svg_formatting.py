import os, sys
from shutil import copy2


RED = '\033[38;5;124m'
WHITE = '\033[38;5;240m'
GREEN = '\033[38;5;70m'
YELLOW = '\033[4;1;33m'
ENDC = '\033[0m'
        

def read(file):
    with open(file) as f:
        return f.read()


def main():
    base_dir = 'D:/Documents/Github/tubi-carrillo.github.io/src/buttons/'
    icon_types = ['-default.svg', '-hover.svg',
                  '-click.svg', '-disabled.svg']
    
    os.system('color')

    os.chdir(base_dir)
    
    for directory in os.listdir():
        print(f'\n> Working in "{YELLOW}{directory}{ENDC}"...')

        for icon_type in icon_types:
            file = f'{directory}/{directory}{icon_type}'

            if os.path.isfile(file):
                name, ext = os.path.splitext(file)

                if ext == '.svg':
                    icon_data = read(file)
                    if '"data:img/png;' in icon_data:
                        with open(file, 'w') as icon:
                            icon.write(icon_data.replace('"data:img/png;', '"data:image/png;'))

                        print(f'*\tThe file "{GREEN}{directory}{icon_type}{ENDC}" '
                              + 'has been changed.')
                    else:
                        print(f'>\t{WHITE}Nothing was changed in file '
                              + f'"{directory}{icon_type}".{ENDC}')
            elif icon_type == '-default.svg':
                break
            else:
                print(f'>\tMissing file type "{RED}{icon_type[1:-4]}{ENDC}". Default copied.')
                copy2(f'{directory}/{directory}-default.svg', file)

    print('\nDone.')
                

if __name__ == '__main__':
    main()
