# atcon

### atcon是什么
1. con即`condition`条件，atcon，指为条件而生；
2. at也来源atom，代表它是一个原子操作；
3. 把复杂的`if else`逻辑转变为简单的原子操作，就在atcon。

### atcon的目标
和复杂的 `if else` 说再见

### 为什么

具体见[使用atcon告别混乱的if else](http://xaber.co/2017/03/02/%E4%BD%BF%E7%94%A8atcon%E5%91%8A%E5%88%AB%E6%B7%B7%E4%B9%B1%E7%9A%84if-else/)

### 使用方式

```
atcon(conditions, states, predicate);
```

### 执行逻辑
1. 根据`states`数组项元素，依次查找`condtions`对象（也可以是数组）的`state0`属性，得到`conditons1`对象，再查找`conditons1`的`state1`属性...... 其实相当于一个`reduce`
2. `predicate`接收`reduce`传进来的每一项的`conditon[state]`，如果满足条件，`predicate`函数 `return true` 就退出查找，得到该值
3. 如果`conditon[state]`不存在，则重新回到上层查找，层层回溯，并获取该层对象的`__DEFAULT__`属性，传递给`predicate`，同样的，如果`return true`，退出查找，得到该值。其实相当于 `switch`内的`default`

### 具体例子
```
const imgMap = {
    online: {
        '2': {
            a: 'img_b',
            b: 'img_o'
        },
        '3': {
            a: 'img_b',
            b: 'img_p'
        },
        '4': 'img_c',
        '5': 'img_d',
        '6': 'img_e'
    },
    offline: {
        '2': 'img_h',
        '3': 'img_i',
        '4': 'img_j',
        '5': 'img_k',
        '6': 'img_l'
    },
    __DEFAULT__: 'img_a'
};

const noticeMap = {
    b: {
        '3': 'text3',
        '5': 'text5'
    },
    a: 'textaaa',
    __DEFAULT__: 'textdefault'
};

const isString = obj => Object.prototype.toString.call(obj) === '[object String]';

atcon(imgMap, ['online', 3, 'a'], isString); // 'img_b'
atcon(imgMap, ['online', 3, 'c'], isString); // 'img_a'
atcon(imgMap, ['offline', 3, 'v'], isString); // 'img_i'
atcon(imgMap, ['noline'], isString); // 'img_a'

atcon(noticeMap, ['b', 1], isString); // 'textdefault'
atcon(noticeMap, ['a', 6, 1, 5, 6], isString); // 'textaaa'
```

**注意**
```
atcon(noticeMap, ['b'], isString); // undefined
```
返回的是 `undefined`，因为我认为，已经走进了 `switch case b`的逻辑，不应该走到同层的`default`，如果这两个分支返回的结果一样，那就不需要 `b`这个分支了。同理，`if else`也是互斥的存在。

更多例子可直接参考[mocha test](https://github.com/Xaber20110202/atcon/blob/master/test.js)

### 最后
希望大家用得开心。