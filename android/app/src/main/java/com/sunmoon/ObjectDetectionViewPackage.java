public class ObjectDetectionViewPackage implements ReactPackage {

    @Override
    public List<NativeModule>
    createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    @Override
    public List<ViewManager>
    createViewManagers(ReactApplicationContext reactContext) {
         return Collections.<ViewManager>singletonList(
            new ObjectDetectionViewManager()
        );
    }
}
