# React.js UI/UX components for Withcenter team

This is a shared React.js library for the projects made by Withcenter team.

## Installation

- **Fontawesome**:
  - Font awesome version 6.x is required for this project.
  - So, install the font awesome 6.

## CLSX

- Official document: [clsx](https://www.npmjs.com/package/clsx).

- Use the `clsx` library to add class names to the elements.

```jsx
// Strings (variadic)
clsx("foo", true && "bar", "baz");
//=> 'foo bar baz'
```

```jsx
// Objects
clsx({ foo: true, bar: false, baz: isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo: true }, { bar: false }, null, { "--foobar": "hello" });
//=> 'foo --foobar'

// Arrays
clsx(["foo", 0, false, "bar"]);
//=> 'foo bar'

// Arrays (variadic)
clsx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx(
  "foo",
  [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
  "cya"
);
//=> 'foo bar hello world cya'
```

```jsx
<section
  className={clsx(
    toast.status ? "block" : "hidden",
    "toast fixed bottom-3"
  )}
>
```

## Button class

- Use the `.button` utility class to `<button>` and `<a>` elements to make it look like a button.
- Do not use any UI Library for button.

```tsx
<a href="/0" className="secondary button">Secondary Button</a>
<button className="button">Primary Button</button>
<button className="warning button">Warning Button</button>
```

## Button Components

- Use `Button` component to display a button.

### CancelButton

- Use `CancelButton` component to display a cancel button.

```jsx
<CancelButton loading={api.loading} onClick={cancelEdit}>
  {t("cancel")}
</CancelButton>
```

### SubmitButton

- Use `SubmitButton` component to display a submit button.

```jsx
<SubmitButton loading={api.loading}>
  {t("post.comment-create-submit")}
</SubmitButton>
```

## Common Components

- All common components are in the `src/components/common` folder.

### Title component

- The `<Title>` component is used to display a title text.

### Description component

- The `<Description>` component is used to display a description or label text.

## .spinner class

- You can use `.spinner` class to display a spinner.
- The spinner is a simple CSS animation that rotates an element.
- You can spin any element by adding the `.spinner` class to it.

Example

```jsx
<FontAwesomeIcon icon={faCircleNotch} className="spinner" /> // Spin an icon


// Spin a group of icons or elements
<nav className="spinner">
  <FontAwesomeIcon icon={faUserPlus} className="text-4xl text-gray-500" />
  <FontAwesomeIcon icon={faMerge} className="text-6xl text-gray-500" />
</nav>
```

## Spinner

- Use `Spinner` component to display a spinner. It merely adds the `.spinner` class to the element.

```jsx
<Spinner />
```

## Loader

- Use `Loader` component to display a loading spinner with text.
- The `Loader` component uses the `Spinner` component internally.

```jsx
<Loader text="Loading..." />
```

## Skeleton

- Use `Skeleton` component to display a skeleton loader.
- Use `SkeletonCard` component to display a skeleton card loader.
- Use `<SkeletonList />` component to display a skeleton list loader.
- Use `<SkeletonListWithNavigator />` component to display a skeleton list with navigator loader.
- Use `<SkeletonTableList />` component to display a skeleton table list loader.

```jsx
      <Skeleton />

      <Skeleton width={40} height={40} circle />

      <Skeleton width={120} height={36} className="rounded-md" />

      <div className="space-y-2">
        <Skeleton height={150} className="rounded-t-lg" />
        <Skeleton width="70%" />
        <Skeleton />
        <Skeleton width="80%" />
      </div>

      <Skeleton count={5} height={24} className="my-2" />

      <section className="flex flex-col gap-3 my-8 bg-gray-300 p-4">
        <nav className="flex gap-3">
          <Skeleton width={40} height={40} circle />
          <div className="flex gap-1 flex-col grow">
            <Skeleton width={120} height={16} className="rounded-md" />
            <Skeleton width="69%" height={16} className="rounded-md" />
          </div>
        </nav>
        <Skeleton height={150} className="rounded-t-lg" />
        <nav className="flex justify-between">
          <Skeleton width="44%" height={16} className="rounded-md" />
          <Skeleton width="28%" height={16} className="rounded-md" />
        </nav>
      </section>
```

## Input

- Use `<Input />` component as much as possible.
- There is no `<Textarea />` component because it often needs more care about Rich-editing. Use `<textarea>...</textarea>`.

## Icons

### CameraIcon

- To make it more redable, use the `CameraIcon` component to display a camera icon.
- The `CameraIcon` component is a wrapper around the `FontAwesomeIcon` component.

```jsx
import { CameraIcon } from "@/withcenter-react-library/icons/CameraIcon";

<CameraIcon className="text-4xl text-gray-500" />;
```

## Warning

- Use this to display an error or warning message.
- If the `message` is falsy, it will not display anything.

```jsx
<Warning className="mt-8" message={error} />
```

## Progress

- Use the `Progress` component to display a progress bar.

```jsx
<Progress progress={progress} />
```

## DisplayFiles

- Use the `DisplayFiles` component to display a list of files or photos.

```jsx
<DisplayFiles files={post.files} />
```

## Quill Rich Editor

- [forum.md](./forum.md) 를 참고한다.
