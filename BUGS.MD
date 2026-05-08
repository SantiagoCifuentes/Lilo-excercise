standard_user bug:

### Reset App State does not reset item button state
Steps to reproduce:
1. Login as `standard_user`
2. Add an item to the cart
3. Click "Reset App State"

Observed:
- Cart badge is cleared
- Cart becomes empty
- Inventory item button still displays "Remove"

Expected:
- Inventory item button should revert to "Add to cart"

Evidence:
screenshots\resetAppState.png



problem_user bugs:
### Incorrect product images displayed on inventory page

Steps to reproduce:
1. Login as `problem_user`
2. Navigate to the inventory page

Observed:
- Multiple inventory items display the same dog image instead of their corresponding product image

Expected:
- Each inventory item should display its correct product image

Evidence:
screenshots\wrongItemImages.png


### Items 1,2,5 

### Remove button does not remove certain items from the cart

Steps to reproduce:
1. Login as `problem_user`
2. Click "Add to cart" button in items 1, 2 or 5 
3. Click the "Remove" button


Observed:
- Clicking "Add to cart" changes the button text to "Remove"
- Clicking "Remove" does not revert the button back to "Add to cart"

Expected:
- Clicking "Remove" should remove the item and restore the "Add to cart" state


### Certain inventory items cannot be added to the cart

Steps to reproduce:
1. Login as `problem_user`
2. Attempt to add items 3, 4, or 6 to the cart

Observed:
- Clicking "Add to cart" has no effect
- Button state does not change
- Cart badge does not update

Expected:
- The selected item should be added to the cart
- The button should change to "Remove"
- Cart badge should update correctly


### Last Name input corrupts First Name field during checkout

Steps to reproduce:
1. Login as `problem_user`
2. Add an item to the cart
3. Proceed to checkout
4. Enter a value in the "First Name" field
5. Type any character in the "Last Name" field

Observed:
- The "First Name" field value is cleared
- If you enter any character in the "Last Name" field, that character will overwrite the "First Name" field.

Expected:
- Typing in the "Last Name" field should not modify the "First Name" field
- Both fields should preserve their independently entered values


### Product sorting options do not reorder inventory items correctly

Steps to reproduce:
1. Login as `problem_user`
2. Open the product sorting dropdown
3. Select any sorting option:
   - Name (A to Z)
   - Name (Z to A)
   - Price (low to high)
   - Price (high to low)

Observed:
- Inventory items do not reorder according to the selected sorting option

Expected:
- Inventory items should be reordered correctly based on the selected sorting criteria