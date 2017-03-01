var expect = require('chai').expect;
var atcon = require('./index.js');

var codeArr = [
    '0', [
        [
            '100',
            '101',
        ],
        '11', [
            '120',
            '121',
        ],
        [
            '130',
            '131',
        ],
        [
            '140',
            '141'
        ]
    ]
];

var resultMap = {
    a: {
        b: {
            a: 6,
            c: 10
        },
        __DEFAULT__: -100
    },
    b: {
        x: {
            a: 10,
            b: 20,
            c: {
                d: 70,
                __DEFAULT__: 60
            }
        },
        __DEFAULT__: 30
    },
    __DEFAULT__: 1000
};

var imgMap = {
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

var noticeMap = {
    b: {
        '3': '文案三',
        '5': '文案五'
    },
    a: '一样的ABTEST文案',
    __DEFAULT__: '文案零'
};

var isString = obj => Object.prototype.toString.call(obj) === '[object String]';
var isNumber = obj => Object.prototype.toString.call(obj) === '[object Number]';

var tests = [
{
    name: 'test 11',
    params: [codeArr, [1, 1, 1], isString],
    expect: '11'
}, {
    name: 'test 101',
    params: [codeArr, [1, 0, 1], isString],
    expect: '101'
}, {
    name: 'test 001',
    params: [codeArr, [0, 0, 1], isString],
    expect: '0'
}, {
    name: 'test aba',
    params: [resultMap, ['a', 'b', 'a'], isNumber],
    expect: 6
}, 
{
    name: 'test abdc',
    params: [resultMap, ['a', 'b', 'd', 'c'], isNumber],
    expect: -100
}, {
    name: 'test b',
    params: [resultMap, ['b'], isNumber],
    expect: undefined
}, {
    name: 'test bxcd',
    params: [resultMap, ['b', 'x', 'c', 'd'], isNumber],
    expect: 70
}, 
{
    name: 'test bxcde',
    params: [resultMap, ['b', 'x', 'c', 'd', 'e'], isNumber],
    expect: 70
}, 
{
    name: 'test bxc',
    params: [resultMap, ['b', 'x', 'c'], isNumber],
    expect: undefined
},
{
    name: 'test bxcf',
    params: [resultMap, ['b', 'x', 'c', 'f'], isNumber],
    expect: 60
},
{
    name: 'test bxff',
    params: [resultMap, ['b', 'x', 'f', 'f'], isNumber],
    expect: 30
},
{
    name: 'test x',
    params: [resultMap, ['x'], isNumber],
    expect: 1000
},
{
    name: 'test imgMap online 3 a',
    params: [imgMap, ['online', 3, 'a'], isString],
    expect: 'img_b'
},
{
    name: 'test imgMap online 3 c',
    params: [imgMap, ['online', 3, 'c'], isString],
    expect: 'img_a'
},
{
    name: 'test imgMap offline 3 b',
    params: [imgMap, ['offline', 3, 'v'], isString],
    expect: 'img_i'
},
{
    name: 'test imgMap noline',
    params: [imgMap, ['noline'], isString],
    expect: 'img_a'
},
{
    name: 'test noticeMap b 1',
    params: [noticeMap, ['b', 1], isString],
    expect: '文案零'
},
{
    name: 'test noticeMap a 6 1 5 6',
    params: [noticeMap, ['a', 6, 1, 5, 6], isString],
    expect: '一样的ABTEST文案'
}];

describe('test atcon', () => {
    tests.forEach((test) => {
        it(test.name, () => {
            expect(atcon.apply(null, test.params)).to.be.equal(test.expect);
        });
    });
});