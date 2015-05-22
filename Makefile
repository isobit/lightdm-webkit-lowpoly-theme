default:
	makepkg
checksum:
	makepkg -g >> PKGBUILD
install:
	makepkg -i
