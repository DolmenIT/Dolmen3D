
BUILD_NAME="./build/dolmen3d/" 
DIST_NAME="./dist/dolmen3d.js"
TEST_NAME="./examples/vendors/dolmen3d/dolmen3d.js"

rm -r $BUILD_NAME
rm $DIST_NAME
rm $TEST_NAME

tsc

echo "test1"

call npx webpack --config webpack.config.js

echo "test2"

cp -r $DIST_NAME $TEST_NAME

# uglifyjs $DEST_NAME -o $UGLY_NAME -c -m
