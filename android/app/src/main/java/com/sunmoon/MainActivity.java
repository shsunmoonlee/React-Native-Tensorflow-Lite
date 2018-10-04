package com.sunmoon;

import com.facebook.react.ReactActivity;
import com.sh3rawi.RNAudioPlayer.*; // <--- import
import com.rnfs.RNFSPackage;  // <--- import
// import org.tensorflow.lite.Interpreter;

// TODO implement kotlin instead of JAVA and bring in onCreate
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     *    @Override
         protected List<ReactPackage> getPackages() {
           return Arrays.<ReactPackage>asList(
             new MainReactPackage(), // <---- add comma
             new RNFSPackage(), // <---------- add package
             new RNAudioPlayer()
           );
         }
     *
     */

    @Override
    protected String getMainComponentName() {
        return "SunMoon";
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ObjectDetectionViewPackage()
        );
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
    }


    // protected Interpreter tflite;
    // tflite = new Interpreter(loadModelFile(activity));
    // protected List<ReactPackage> getPackages() {
    //     return Arrays.<ReactPackage>asList(
    //             new MainReactPackage(),
    //             new CustomImageClassifierPackage()); // <-- Add this line with your package name.
    // }




    // override fun createReactActivityDelegate(): ReactActivityDelegate {
    //     return MainActivityDelegate(this, mainComponentName!!)
    // }
    //
    // inner class MainActivityDelegate(val activity: Activity, val mainComponentName: String): ReactActivityDelegate(activity, mainComponentName) {
    //
    //     override fun onCreate(savedInstanceState: Bundle?) {
    //         super.onCreate(savedInstanceState)
    //         // Do what you need to do
    //     }
    //
    //     override fun onNewIntent(intent: Intent?): Boolean {
    //         // Do what you need to do
    //         return super.onNewIntent(intent)
    //     }
    //
    // }
    // code change to java from kotlin in progress
   //  private ReactActivityDelegate createReactActivityDelegate() {
   //     return MainActivityDelegate(this, mainComponentName)
   // }
   //
   //  class MainActivityDelegate(Activity activity, String mainComponentName) implements ReactActivityDelegate<activity, mainComponentName> {
   //   @Override
   //    private void onCreate(savedInstanceState: Bundle) {
   //         super.onCreate(savedInstanceState)
   //         // Do what you need to do
   //     }
   //     @Override
   //    private Boolean onNewIntent(intent: Intent) {
   //         // Do what you need to do
   //         return super.onNewIntent(intent)
   //     }
   //
   // }
}
