import fnmatch
import os
import sys


def get_valid_pyc_files():
    for import_path in sys.path:
        for root, dir_names, file_names in os.walk(import_path):
            for file_name in fnmatch.filter(file_names, '*.pyc'):
                pyc_file_path = os.path.join(root, file_name)
                py_file_path = pyc_file_path[:-1]

                if os.path.isfile(py_file_path):
                    yield pyc_file_path


def ensure_root():
    is_root = os.geteuid() == 0
    if not is_root:
        sys.exit('Must be run as root')


def main():
    ensure_root()

    for pyc_file_path in get_valid_pyc_files():
        print 'removing', pyc_file_path
        os.remove(pyc_file_path)


if __name__ == '__main__':
    main()
