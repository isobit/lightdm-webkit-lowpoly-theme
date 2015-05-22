# Maintainer: Josh Glendenning <joshglendenning@gmail.com>

pkgname=lightdm-webkit-theme-lowpoly
_pkgname=lowpoly
pkgver=0.1.0
pkgrel=1
pkgdesc="A minimalistic theme for lightdm-webkit2-greeter"
arch=('any')
url="https://github.com/joshglendenning/lightdm-webkit-lowpoly-theme"
license=('GPLv2')
depends=('lightdm' 'lightdm-webkit2-greeter')
install=theme.install
source=("${pkgname}-${pkgver}.tar.gz::https://github.com/Antergos/${pkgname}/archive/${pkgver}.tar.gz"
        'http://antergos.com/wallpapers.tar.xz')

build()
{
	cd ${srcdir}/${pkgname}-${pkgver}
        sed -i 's%/usr/share/%/usr/share/lightdm-webkit/themes/%g' index.html
}

package()
{
	cd ${pkgdir}
	mkdir -p usr/share/lightdm-webkit/themes
	cd usr/share/lightdm-webkit/themes
	cp -dpr --no-preserve=ownership ${srcdir}/${pkgname}-${pkgver} ${_pkgname}
	msg "Removing .git files"
	cd ${_pkgname}
	rm -rf .gitignore
}
