import os, sys


def read(file):
    with open(file) as f:
        return f.read()


def main():
    base_dir = 'D:/Documents/Github/tubi-carrillo.github.io/src/buttons/'
    icon_types = ['-default.svg', '-hover.svg',
                  '-click.svg', '-disabled.svg']

    os.chdir(base_dir)
    
    for directory in os.listdir():
        print(f'\n> In directory "{directory}"...')

        for icon_type in icon_types:
            file = f'{directory}/{directory}{icon_type}'

            if os.path.isfile(file):
                name, ext = os.path.splitext(file)

                if ext == '.svg':
                    icon_data = read(file)
                    if 'img' in icon_data:
                        with open(file, 'w') as icon:
                            icon.write(icon_data.replace('img', 'image'))

                        print(f'>\tThe file "{directory}{icon_type}" '
                              + 'has been changed.')
                    else:
                        print('>\tNothing was changed in file '
                              + f'"{directory}{icon_type}".')

    input('\nDone. Press enter to finish.')
                

if __name__ == '__main__':
    main()
