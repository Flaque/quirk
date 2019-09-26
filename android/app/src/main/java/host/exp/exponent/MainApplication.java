package host.exp.exponent;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import okhttp3.OkHttpClient;

import org.unimodules.core.interfaces.Package;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactlibrary.RNPurchasesPackage;
import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;


import host.exp.exponent.generated.BasePackageList;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage>  {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNPurchasesPackage(),
            new ReactNativeOneSignalPackage()
    );
  }

  public List<Package> getExpoPackages() {
    return new BasePackageList().getPackageList();
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
