# EasyAnimation
## Property EasyAnimation
### EasyAnimation.prefix
Устанавливает префикс для классов: ...-enter, ...-enter-active, ...-enter-to, ...-leave, ...-leave-active, ...-leave-to.
## Methods EasyAnimation
### EasyAnimation.*transition*(element[, callback = null])
**element** - DOMelement, над котором будет производиться скрытие или показ, в зависимости от состояния CSS свойства *display*. Если *none* - показ, если *block* - скрытие.

**callback** - Функция, которая будет вызываться когда анимация начнется и закончится.
### EasyAnimation.*transitionInsert*(targetInsert, newElement[, before = null[, callback = null]])
**targetInsert** - DOMelement, в который будет вставляться новый элемент.

**newElement** - Новый элемент, который нужно вставить.

**before** - DOMelement, перед которым нужно вставить.

**callback** - Функция, которая будет вызываться когда анимация начнется и закончится.
### EasyAnimation.*transitionRemove*(element[, callback = null])
**element** - DOMelement, который нужно удалить.

**callback** - Функция, которая будет вызываться когда анимация начнется и закончится.