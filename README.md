# Technical Test Ionic

Los usuarios para probar en la aplicación son:
```
- username: dummy1 
- password: 123456
```
```
- username: dummy2
- password: 123456
```
Los pasos y requisitos para desplegar la aplicación en iOS son:

### Requisitos: 
    - node 10.16.3
    - Xcode 7 o mayor
    - iOS 9
    
[Documentación oficial](https://ionicframework.com/docs/installation/ios)

Instalar las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto:
```bash
    npm install
```

Instalar ionic y cordova de manera global:
```bash
    npm i -g ionic cordova
```

Generar la plataforma para iOs con el siguiente comando en la raíz del proyecto: 
```bash
    ionic cordova prepare ios
```

Ejecutar en xCode desde _~RAIZ_DEL_PROYECTO/platforms/ios_  
