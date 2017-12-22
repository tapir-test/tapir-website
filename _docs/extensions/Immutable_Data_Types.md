---
title: Immutable Data Types
documentation: tapir provides annotations for building immutable types easily. You just have to annotate your class with @Immutable.
permalink: /docs/extensions/immutables/
---
Data used in the test cases is often supposed to be "immutable", hence
the data is defined once and only read by the tests afterwards. The
<i>tapir</i> Data module provides a helpful annotation for this task.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  This <i>tapir</i> module is inspired by
  <a href="https://immutables.github.io/">Immutables</a>, a great library which
  relies on Java Annotation Processing.
  </div>
</div>

## Dependency

``` xml
<dependency>
  <groupId>de.bmiag.tapir</groupId>
  <artifactId>tapir-data</artifactId>
</dependency>
```

## Creating Immutable Objects

The annotation Immutable can be used on the classes containing the test
data. The annotated classes are made immutable and can therefore only be
created using provided builder methods.

**LoginUser.xtend**

``` xtend
@Immutable
class LoginUser {
  String username
  String password
}
```

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-systemtest/src/test/java/de/bmiag/tapir/showcase/google/systemtest/data/SearchTermExpectation.xtend">SearchTermExpectation</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/data/ContentElementExpectation.xtend">ContentElementExpectation</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/data/WikipediaContentTableExpectaton.xtend">WikipediaContentTableExpectaton</a>
    </li>
  </ul>
  </div>
</div>

As soon as the LoginUser class is annotated, its constructor becomes
private and the class has a new method named build. The values can be
set in the initialization procedure of this method and it returns a new
LoginUser object which can not be modified afterwards. Some further
methods (equals, hashCode and toString) are generated automatically.

**MyCode.xtend**

``` xtend
val adminUser = LoginUser.build [
  username = 'admin'
  password = 'password'
]

println( adminUser.hashCode )
println( adminUser.toString )
println( adminUser.equals(adminUser) )
```

## Copying Immutable Objects

Although an existing immutable object cannot be changed, you can use the
copy method to copy the existing object and change some of its values.
The original object is not changed during this operation.

**MyCode.xtend**

``` xtend
val adminUser = LoginUser.build [
  username = 'admin'
  password = 'password'
]

val consultantUser = adminUser.copy [
  username = 'consultant'
]
```

## Optional and Mandatory Fields

Attributes of an immutable class are by default mandatory. If you try
and create an instance of such a class with the build method without
setting all attributes, the method will throw an exception. The
following example would throw java.lang.IllegalStateException: Cannot
build LoginUser, some of the required attributes are not set
\[password\].

**MyCode.xtend**

``` xtend
LoginUser.build [
  username = 'admin'
]
```

As this is not always the desired behaviour, you can use the Optional
class. Attributes of the type Optional can be initialized in the build
method, but it is not mandatory to do so. With the following definition
of LoginUser, the above code would no longer throw an exception.

**LoginUser.xtend**

``` xtend
@Immutable
class LoginUser {
  String username
  Optional<String> password
}
```

## Collection Attributes

The Immutable annotation currently supports collection attributes of the
types Set and List. The attributes are immutable as well in the sense
that the collections are immutable. Adding or removing elements to and
from them will result in a *java.lang.UnsupportedOperationException*.

**NumberHolder.xtend**

``` xtend
@Immutable
class NumberHolder {
    List<Integer> listOfNumbers
    Set<Integer> setOfNumbers
}
```

In the build method, you can use Xtend's shortcuts for creating lists
and sets.

**MyCode.xtend**

``` xtend
NumberHolder.build [
    listOfNumbers = #[1, 2, 3]
    setOfNumbers = #{1, 2, 3, 3}
]
```

## Inheritance and Composition

Immutable classes are made final and can therefore not be used for
inheritance. However, it is possible to use composition instead. With
the Include annotation, each field of a class is copied into the
immutable class.

**LoginUser.xtend**

``` xtend
@Immutable
class LoginUser {
    String username
    String password
}
```

 

**LoginUserWithDomain.xtend**

``` xtend
@Immutable
class LoginUserWithDomain {
    @Include
    LoginUser loginUser
    String domain
}
```

In this example, the *LoginUserWithDomain* has the same attributes as
the *LoginUser*, plus the new attribute *domain*.

``` xtend
LoginUserWithDomain.build [  
    username = 'admin'
    password = 'password'
    domain = '001'
]
```

## Implementing Interfaces

In some cases you might want to create test data which just fulfils a
contract. As contracts in Java are usually represented by interfaces,
the Immutable annotation allows you to define interfaces which should be
fulfilled by the test data. The required fields for the test data is
generated based on the getters within the interface.

**User.xtend**

``` xtend
interface User {
    def String getUsername()
}
```

 

**Password.xtend**

``` xtend
interface Password {
    def String getPassword()
}
```

 

**LoginUser.xtend**

``` xtend
@Immutable(interfaces = #[User, Password])
class LoginUser {
}
```

The LoginUser fulfils the interfaces User and Password by providing
immutable attributes username and password - and by implementing the
given interfaces. In case that the interfaces contain methods, that are
not getters, your class simply has to implement the methods.

**LogIn.xtend**

``` xtend
interface LogIn {
    def void logIn()    
}
```

**LoginUser.xtend**

``` xtend
@Immutable(interfaces = #[LogIn])
class LoginUser {

    override logIn() {
    }

}
```

## Making Fields Modifiable

In very rare cases you might want to break the immutability of an
otherwise immutable object partially. For this use case, you can use the
annotation Modifiable. Annotating a field with Modifiable will generate
a setter for the field as well.

**LoginUser.xtend**

``` xtend
@Immutable
class LoginUser {
    String username
    @Modifiable
    String password
}
```

You can now create an instance of the class LoginUser as usual, but now
you can also change the field password later.

**MyCode.xtend**

``` xtend
val user = LoginUser.build [
        username = 'admin'
        password = 'password'
]

user.password = 'newPassword'
```

In case you are using interfaces for the *Immutable* annotation, you can
also annotate the getter method.

**User.xtend**

``` xtend
interface User {
    def String getUsername()
}
```

**Password.xtend**

``` xtend
interface Password {
    @Modifiable
    def String getPassword()
}
```

**LoginUser.xtend**

``` xtend
@Immutable(interfaces = #[User, Password])
class LoginUser {
}
```

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-warning"></span> Caution</div>
  </div>
  <div class="panel-body">
  We recommend to use this annotation sparingly and with caution. It
  breaks the concept of the immutability of test data!
  </div>
</div>

## Equals, hashCode and toString

The three methods *equals*, *hashCode* and *toString* and generated
based on the attributes of the immutable class. Per default all
available attributes are used in these methods. If you don't want to use
specific attributes in these methods, you can exclude them by annotating
the fields with
[ExcludeFromEqualsHashCode](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/data/Immutable.ExcludeFromEqualsHashCode.html) or
with
[ExcludeFromToString](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/data/Immutable.ExcludeFromToString.html).

**LoginUser.xtend**

``` xtend
@Immutable
class LoginUser {
    @ExcludeFromToString
    String username
    @ExcludeFromEqualsHashCode
    String password
}
```

With the annotations, the generated *equals* and *hashCode* methods
would use only the *username* of the *LoginUser*.

**LoginUser.java**

``` java
@Override
@Pure
public boolean equals(final Object obj) {
  if (this == obj)
    return true;
  if (obj == null)
    return false;
  if (getClass() != obj.getClass())
    return false;
  LoginUser other = (LoginUser) obj;
  if (this.username == null) {
    if (other.username != null)
      return false;
  } else if (!this.username.equals(other.username))
    return false;
  return true;
}

@Override
@Pure
public int hashCode() {
  final int prime = 31;
  int result = 1;
  result = prime * result + ((this.username== null) ? 0 : this.username.hashCode());
  return result;
}
```

The generated *toString* method uses only the *password*.

**LoginUser.java**

``` java
@Override
@Pure
public String toString() {
  ToStringBuilder b = new ToStringBuilder(this).skipNulls();
  b.add("password", this.password);
  return b.toString();
}
```

As usual, you can also annotate the getter methods of interfaces.

**User.xtend**

``` xtend
interface User {
   @ExcludeFromToString
   def String getUsername()
}
```

**Password.xtend**

``` xtend
interface Password {
   @ExcludeFromEqualsHashCode
   def String getPassword()
}
```

**LoginUser.xtend**

``` xtend
@Immutable(interfaces = #[User, Password])
class LoginUser {
}
```

## Custom Label

<i>tapir</i> offers the possibility to declare which attributes form an
object's label. The feature perfectly fits in conjunction with Immutable
Data Types, but it can be used with any data container.

Annotating a class with [@CustomLabel](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/label/CustomLabel.html) instructs the class to implement
the [CustomLabeled](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/label/CustomLabeled.html) interface. An implementation of the getCustomLabel()
method is generated. You can optionally annotate fields with [@LabelPart](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/label/LabelPart.html)
in order to declare them as part of the object's label. If no field is
annotated with *@LabelPart* all fields are taken into account for the
label generation.

For the LoginUser a reasonable label just contains the username and
omits the password. You can achieve this by using the declaration shown
below.

**LoginUser.xtend**

``` xtend
@Immutable
@CustomLabel
class LoginUser {
    @LabelPart
    String username
    String password
}
```

<i>tapir's</i> runtime is aware of the *CustomLabeled* interface by
binding [CustomLabelAwareLabelProvider](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/label/CustomLabelAwareLabelProvider.html).
Whenever the *getLabel(Object)* method is called, the
*CustomLabelAwareLabelProvider* checks if the given object implements
*CustomLabeled*. If so, it returns *CustomLabel.getCustomLabel()*,
otherwise it falls back to the object's *toString()* method.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-systemtest/src/test/java/de/bmiag/tapir/showcase/google/systemtest/data/SearchTermExpectation.xtend">SearchTermExpectation</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/data/WikipediaContentTableExpectaton.xtend">WikipediaContentTableExpectaton</a>
    </li>
  </ul>
  </div>
</div>
