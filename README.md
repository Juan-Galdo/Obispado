
# Obispado UCB

Proyecto de la universidad para Obispado.
## Requisitos

Deben tener instalado Git: [Descargar Git](https://github.com/git-for-windows/git/releases/download/v2.40.0.windows.1/Git-2.40.0-64-bit.exe).

Luego de instalar Git, tendrán una terminal llamada `Git Bash` en sus computadoras, con esa terminal realizaremos los comandos de `Git`.
## Comandos Git

Por ahora realizaremos tres cosas:

* Clonar el repositorio
* Subir cambios al repositorio
* Actualizar el repositorio en su local (es para tener los cambios que hicieron los demás compañeros)

### Clonar repositorio

Abren la terminal `Git Bash` y realizan los siguientes comandos:

```bash
  cd Desktop/
  git clone https://github.com/Juan-Galdo/Obispado.git
  cd Obispado/
```   
Con esos comandos ya estarán en el proyecto Obispado.

### Subir cambios al repositorio

Siempre que hagan cambios en el proyecto que clonaron estan modificando el proyecto, pero de manera `local`. Lo siguientes comandos son para subirlo al repositorio en GitHub.

```bash
  git add .
  git commit -m "Mensaje de descripción corto"
  git push origin main
```   

### Actualizar repositorio local

Cuando un compañero realiza cambios al repositorio en GitHub, automaticamente NO se aplica esos cambios en su repositorio local, deben actualizar el repositorio local.

```bash
  git pull
```

Con ese comando podrán actualizar su repositorio, OJO! Siempre deben hacerlo porque puede que un compañero haya hecho cambios anteriormente.
