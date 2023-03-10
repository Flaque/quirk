# This file contains the fastlane.tools configuration
# You can find the documentation at https://docs.fastlane.tools
#
# For a list of all available actions, check out
#
#     https://docs.fastlane.tools/actions
#
# For a list of all available plugins, check out
#
#     https://docs.fastlane.tools/plugins/available-plugins
#

# Uncomment the line if you want fastlane to automatically update itself
# update_fastlane

default_platform(:android)

platform :android do
  desc "Assemble Build"
  lane :build do |options|
    gradle(task: 'clean assemble', build_type: "release", properties: {
      "android.injected.signing.store.file" => "/Users/flaque/.keystores/android",
      "android.injected.signing.store.password" => ENV['KEYSTORE_PASSWORD'],
      "android.injected.signing.key.alias" => "key0",
      "android.injected.signing.key.password" => ENV['KEY_PASSWORD'],
    })
  end

  lane :bump_version_code do
    path = '../app/build.gradle'
    re = /versionCode\s+(\d+)/ 
  
    s = File.read(path)
    versionCode = s[re, 1].to_i
    s[re, 1] = (versionCode + 1).to_s
  
    f = File.new(path, 'w')
    f.write(s)
    f.close
  end

  desc "Runs all the tests"
  lane :test do
    gradle(task: "test")
  end

  desc "Submit a new Internal"
  lane :internal do
    bump_version_code
    gradle(task: 'clean assemble', build_type: "release", properties: {
      "android.injected.signing.store.file" => "/Users/flaque/.keystores/android",
      "android.injected.signing.store.password" => ENV['KEYSTORE_PASSWORD'],
      "android.injected.signing.key.alias" => "key0",
      "android.injected.signing.key.password" => ENV['KEY_PASSWORD'],
    })
    upload_to_play_store(
      track: 'internal',
      skip_upload_metadata: true,
      skip_upload_images: true,
      skip_upload_screenshots: true,
      skip_upload_apk: false
    )
  
    # sh "your_script.sh"
    # You can also use other beta testing services here
  end

  desc "Deploy a new version to the Google Play"
  lane :deploy do
    gradle(task: "clean assembleRelease")
    upload_to_play_store
  end
end
