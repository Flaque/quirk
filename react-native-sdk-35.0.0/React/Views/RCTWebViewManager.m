/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTWebViewManager.h"

#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "UIView+React.h"

@interface RCTWebViewManager ()

@end

@implementation RCTWebViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RCTLogWarn(@"RCTWebView had to be removed from SDK35-compatible "
  "Expo Client in order to comply with latest App Review"
  "guidelines. Plain empty view will be rendered instead.");
  return [[UIView alloc] initWithFrame:CGRectZero];
}

RCT_EXPORT_METHOD(goBack:(nonnull NSNumber *)reactTag)
{
}

RCT_EXPORT_METHOD(goForward:(nonnull NSNumber *)reactTag)
{
}

RCT_EXPORT_METHOD(reload:(nonnull NSNumber *)reactTag)
{
}

RCT_EXPORT_METHOD(stopLoading:(nonnull NSNumber *)reactTag)
{
}

RCT_EXPORT_METHOD(postMessage:(nonnull NSNumber *)reactTag message:(NSString *)message)
{
}

RCT_EXPORT_METHOD(injectJavaScript:(nonnull NSNumber *)reactTag script:(NSString *)script)
{
}

#pragma mark - Exported synchronous methods

RCT_EXPORT_METHOD(startLoadWithResult:(BOOL)result lockIdentifier:(NSInteger)lockIdentifier)
{
}

@end
