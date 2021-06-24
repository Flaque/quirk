#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n tech.econn.quirk/host.exp.exponent.MainActivity
