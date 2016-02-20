﻿(function (globals) {
    "use strict";

    Bridge.define('TestIssue921Instance.Issue921Instance', {
        statics: {
            config: {
                properties: {
                    NameStatic: null
                }
            }
        },
        _offset: 0,
        config: {
            properties: {
                Name: null
            }
        },
        constructor: function (offset) {
            this._offset = offset;
            Bridge.get(TestIssue921Instance.Issue921Instance).setNameStatic("Static");
        },
        computeValue: function (d) {
            return d.add(Bridge.Decimal(10));
        },
        lambaLiftingWithReadOnlyField: function () {
            var localValue = 456;
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f2).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f3)).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f4)).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithProperty: function () {
            var localValue = "What a name";
    
            return Bridge.Linq.Enumerable.from(["one", "two", "three"]).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f2).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f5)).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f6)).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithStaticProperty: function () {
            var localValue = "What a name";
    
            return Bridge.Linq.Enumerable.from(["one", "two", "three"]).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f1).select($_.TestIssue921Instance.Issue921Instance.f2).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f5)).select($_.TestIssue921Instance.Issue921Instance.f7).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithInstanceMethod: function () {
            var localValue = Bridge.Decimal(10.0);
    
            return Bridge.Linq.Enumerable.from([Bridge.Decimal(1.0), Bridge.Decimal(2.0), Bridge.Decimal(3.0)]).select($_.TestIssue921Instance.Issue921Instance.f8).select($_.TestIssue921Instance.Issue921Instance.f8).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f9)).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f10)).select(Bridge.fn.bind(this, $_.TestIssue921Instance.Issue921Instance.f11)).select(function (value) {
                return value.add(localValue);
            });
        },
        lambaLiftingWithDelegate: function () {
            // Lift
            var addThousand = $_.TestIssue921Instance.Issue921Instance.f12;
    
            var localValue = 123;
    
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (value) {
                return addThousand(value + 1);
            }).select(function (value) {
                return addThousand(value + 1);
            }).select(function (value, index) {
                return addThousand(value + index);
            }).select(Bridge.fn.bind(this, function (value) {
                return addThousand(value) + this._offset;
            })).select(Bridge.fn.bind(this, function (value, index) {
                return addThousand(value) + index + this._offset;
            })).select(function (value) {
                return addThousand(value + addThousand(localValue));
            });
        },
        lambaLiftingWithDelegateChangingType: function () {
            // Lift
            var toString = $_.TestIssue921Instance.Issue921Instance.f13;
    
            var localValue = 7;
    
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (value) {
                return toString(value + 1);
            }).select(function (value) {
                return toString(value.length);
            }).select(function (value, index) {
                return toString(value.length + index);
            }).select(Bridge.fn.bind(this, function (value) {
                return toString(value.length) + this._offset;
            })).select(Bridge.fn.bind(this, function (value, index) {
                return toString(value.length) + index + this._offset;
            })).select(function (value) {
                return toString(value.length + toString(localValue).length);
            });
        }
    });
    
    var $_ = {};
    
    Bridge.ns("TestIssue921Instance.Issue921Instance", $_)
    
    Bridge.apply($_.TestIssue921Instance.Issue921Instance, {
        f1: function (value) {
            return value + 1;
        },
        f2: function (value, index) {
            return value + index;
        },
        f3: function (value) {
            return value + this._offset;
        },
        f4: function (value, index) {
            return value + index + this._offset;
        },
        f5: function (value) {
            return value + this.getName();
        },
        f6: function (value, index) {
            return value + index + this.getName();
        },
        f7: function (value, index) {
            return value + index + Bridge.get(TestIssue921Instance.Issue921Instance).getNameStatic();
        },
        f8: function (value) {
            return value.add(Bridge.Decimal(1));
        },
        f9: function (value, index) {
            return value.add(this.computeValue(Bridge.Decimal.lift(index)));
        },
        f10: function (value) {
            return value.add(this.computeValue(Bridge.Decimal(100.0)));
        },
        f11: function (value, index) {
            return value.add(Bridge.Decimal(index)).add(this.computeValue(Bridge.Decimal(200.0)));
        },
        f12: function (i) {
            return i + 1000;
        },
        f13: function (i) {
            return i.toString();
        }
    });
    
    
    
    Bridge.init();
})(this);