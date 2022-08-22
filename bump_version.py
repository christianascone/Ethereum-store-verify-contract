import os
from distutils.version import LooseVersion, StrictVersion
from argparse import ArgumentParser
import subprocess

parser = ArgumentParser()
parser.add_argument("-p", "--position", dest="position",
                    help="Position code. It can be numeric or a string: major, minor or patch", metavar="position")

args = parser.parse_args()
if args.position == 'patch':
	position = 2
elif args.position == 'minor':
	position = 1
elif args.position == 'major':
	position = 0
else:
	position = int(args.position)

def increase_version(ver):
	if ver.isnumeric():
		return str(int(ver) + 1)
	version_array = ver.split('.')
	for i,v in enumerate(version_array):
		v = int(v)
		if i > position:
			v = 0
		elif i == position:
			v = v+1
		padded = str(v)
		if i > 0:
			padded = padded.zfill(2)
		version_array[i] = padded
	new_version = '.'.join(version_array)
	return new_version

def bump_version(filename, placeholder, end_offset, open_branch):
  content = ""
  new_version = ""
  with open(filename, "r") as env:
    for line in env:
      start_version_identifier = placeholder
      if start_version_identifier in line:
        ver = line[len(start_version_identifier):end_offset]
        print("Old Version: {}".format(ver))
        new_version = increase_version(ver)
        print("New Version: {}".format(new_version))
        if open_branch:
          print("Open release")
          subprocess.run(["git-flow", "release", "start", new_version])
        content = content + line.replace(ver, new_version)
      else:
        content = content + line
  with open(filename, "w") as env:
    env.write(content)
  return new_version

def add_staging(filename):
  subprocess.run(["git", "add", filename])

def open_close_release(new_version):
  custom_env = os.environ.copy()
  custom_env["GIT_MERGE_AUTOEDIT"] = "no"
  subprocess.run(["git", "commit", "-m", "Bump version"])
  subprocess.run(["git-flow", "release", "finish", "-m", new_version, new_version], env=custom_env)


filename = 'package.json'
placeholder = '  "version": "'
new_version = bump_version(filename, placeholder, -3, True)
add_staging(filename)

filename = 'README.md'
placeholder = '[project-image]: https://img.shields.io/badge/project-'
new_version = bump_version(filename, placeholder, -10, False)
add_staging(filename)

open_close_release(new_version)