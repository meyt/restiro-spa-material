import sys
import json
import errno
import shutil
import fileinput

from uuid import uuid4
from os.path import join, dirname

from restiro.generators import BaseGenerator


def copy(src, dest):
    try:
        shutil.copytree(src, dest)
    except OSError as e:
        # If the error was caused because the source wasn't a directory
        if e.errno == errno.ENOTDIR:
            shutil.copy(src, dest)
        else:
            print('Directory not copied. Error: %s' % e)

class SPAGenerator(BaseGenerator):

    def generate_index(self):
        this_dir = dirname(__file__)
        assets_dir = join(this_dir, 'dist')
        copy(assets_dir, self.destination_dir)

        f = self._ensure_file('docs.js')
        f.write(
            'window.restiro_docs = %s' % json.dumps(self.docs_root.to_dict())
        )
        f.close()

        # Prevent to cache docs.js file
        index_file = join(self.destination_dir, 'index.html')
        for line in fileinput.input(index_file, inplace=True):
            line = line.replace('docs.js', 'docs.js?v=%s' % uuid4())
            sys.stdout.write(line)

    def generate_documents(self):
        pass

    def generate_resources(self):
        pass

    def write_resource(self, file_stream, resource):  # pragma: nocover
        pass

    def write_document(self, file_stream, document):  # pragma: nocover
        pass

    def write_index(self, file_stream):
        pass
