default:
	makepkg
checksum:
	makepkg -g >> PKGBUILD
install:
	makepkg -i
clean:
	rm -rf *.tar.gz *.tar.xz pkg src
