package host.exp.exponent;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import okhttp3.OkHttpClient;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.dooboolab.RNIap.RNIapPackage;

import host.exp.exponent.generated.BasePackageList;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface {

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
            new ReactNativeOneSignalPackage(),
            new RNIapPackage()
    );
  }

  public List getExpoPackages() {
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
