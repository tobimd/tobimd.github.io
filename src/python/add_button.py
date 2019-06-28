import os, sys
from colors import *


def main(names):
    base_dir = 'D:/Documents/Github/tubi-carrillo.github.io/src/buttons/'
    os.chdir(base_dir)

    for name in names:
        try:
            os.makedirs(f'{name}/psd')
            print(f'* Successfully created "{paint(name, "green")}".')
            
        except FileExistsError:
            print(paint('> "')
                  + paint(name, 'red')
                  + paint('" already exists.'))
            
    print('\nDone.')

if __name__ == '__main__':
    os.system('color')
    
    if len(sys.argv) > 1:
        main(sys.argv[1:])
        
    else:
        print('[ ' + paint('ERROR', 'red') + ' ] At least one name string '
              + 'must be used.')
