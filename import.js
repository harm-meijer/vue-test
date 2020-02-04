/* eslint-disable no-shadow */
const fs = require('fs').promises;

const files = [
  './tests/unit/specs/mixin/productMixin.spec.js',
  './tests/unit/specs/mixin/cartMixin.spec.js',
  './tests/unit/specs/components/cartdetail/LineItemQuantityForm.spec.js',
  './tests/unit/specs/components/productdetail/ProductInfo.spec.js',
  './tests/unit/specs/components/productdetail/VariantSelector.spec.js',
  './tests/unit/specs/components/productdetail/AddToCartForm.spec.js',
  './tests/unit/specs/components/productdetail/ProductGallery.spec.js',
  './tests/unit/specs/components/productdetail/AttributeSelect.spec.js',
  './tests/unit/specs/components/productdetail/DetailsSection.spec.js',
  './tests/unit/specs/components/checkout/StepShippingMethodForm.spec.js',
  './tests/unit/specs/components/checkout/BaseAddressForm.spec.js',
  './tests/unit/specs/components/productoverview/ProductSortSelector.spec.js',
  './tests/unit/specs/components/productoverview/ProductList.spec.js',
  './tests/unit/specs/components/common/form/ValidationError.spec.js',
  './tests/unit/specs/components/common/form/BaseSelect.spec.js',
  './tests/unit/specs/components/common/form/BaseLabel.spec.js',
  './tests/unit/specs/components/common/form/BaseInput.spec.js',
  './tests/unit/specs/components/common/form/ServerError.spec.js',
  './tests/unit/specs/components/common/BaseMoney.spec.js',
  './tests/unit/specs/components/common/BasePrice.spec.js',
  './tests/unit/specs/components/common/cartlike/CartLikePriceDetail.spec.js',
  './tests/unit/specs/components/common/cartlike/CartLikeContentDetail.spec.js',
  './tests/unit/specs/components/common/Breadcrumb.spec.js',
  './tests/unit/specs/components/common/ProductThumbnail.spec.js',
  './tests/unit/specs/components/userprofile/TabChangePassword.spec.js',
  './tests/unit/specs/components/userprofile/TabOrderList.spec.js',
  './tests/unit/specs/components/userprofile/EditProfileForm.spec.js',
  './tests/unit/specs/components/login/SignUpForm.spec.js',
  './tests/unit/specs/components/login/LoginForm.spec.js',
  './tests/unit/specs/components/header/LocationSelector.spec.js',
  './tests/unit/specs/components/header/MiniCart.spec.js',
  './tests/unit/specs/components/header/CategoriesMenu.spec.js',
  './tests/unit/specs/components/header/LoginButton.spec.js',
];
const newPath = line => line
  .replace('.vue\'', '/index.vue\'');

Promise.all(
  files
    // .slice(0, 1)
    .map(
      f => fs.readFile(f, 'utf8').then(c => [f, c]),
    ),
).then(
  files => files.map(
    ([path, content]) => [
      path,
      content.split('\n').map(newPath).join('\n'),
    ],
  ),
).then(
  result => Promise.all(
    result.map(
      ([path, content]) => fs.writeFile(
        path,
        content,
      ),
    ),
  ),
);
