package com.sunmoon;

import com.facebook.react.ReactActivity;
import com.sh3rawi.RNAudioPlayer.*; // <--- import
import com.rnfs.RNFSPackage;  // <--- import
import org.tensorflow.lite.Interpreter;

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
    protected Interpreter tflite;
    tflite = new Interpreter(loadModelFile(activity));
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new CustomImageClassifierPackage()); // <-- Add this line with your package name.
    }
}
