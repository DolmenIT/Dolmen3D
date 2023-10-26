@echo off
set BUILD_NAME=.\build\dolmen3d\
set DIST_NAME=.\dist\dolmen3d.js
set EXAMPLES_NAME=.\examples\vendors\dolmen3d\dolmen3d.js

if exist %BUILD_NAME% rmdir /s /q %BUILD_NAME%
if exist %DIST_NAME% del %DIST_NAME%
if exist %EXAMPLES_NAME% del %EXAMPLES_NAME%

call tsc
call npx webpack --config webpack.config.js

copy %DIST_NAME% %EXAMPLES_NAME%

:: uglifyjs %DEST_NAME% -o %UGLY_NAME% -c -m
