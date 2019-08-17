import os
import argparse
from colorparse import paint
from shutil import copy2 as cpy_file


def _arg_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument('type',
                        help='the mode of icon loading, can be\
                              either "all" (default), "regular"\
                              or "filled".')


def main():
    args = _arg_parser()

    paint(f'Loading ;Cicons;: (mode: ;y{args.type};:)')

    


if __name__ == '__main__':
    main()
