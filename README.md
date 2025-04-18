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

## Custom Design

- The UI design is customizable by adding the styles on global css.
- For example, you can add the following styles to the `global.css` file. And the look of buttons will be changed.

```css
.button {
  @apply inline-block px-3 py-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer;
  &.secondary {
    @apply bg-slate-200 text-black;
  }
  &.warning {
    @apply bg-red-500 text-white;
  }
  &.text {
    @apply bg-transparent text-blue-500;
  }
}
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
import { CameraIcon } from "@/withcenter-react-library/components/components/icons/CameraIcon";

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

## Unit Test

- To run the unit test, run the following command:

```bash
cd ./functions/
tsx common.functions.test.ts
```

## Hooks

### useApi

- Use `useApi` hook to call the API.
  - It can be used to call any 3rd party API like;
    - Firebase Database Query
    - Any 3rd party REST API
    - etc.
- This help to write simple and readable code.
- Important note:
  - The `useApi` hook must be propertly typed or;
    - you may have to use `as` keyword to cast the type.
    - you need `{!! api.data && ... }` in JSX to check if the data is not null.

```jsx
import useApi from "@/withcenter-react-library/hooks/api/useApi";
export default function FindUser() {
  const api = useApi<Record<string, ChatUserInterface>>();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { nickname } = fromFormData(e) as { nickname: string };
    api.query(async () => {
      const snapshot = await usersQuery(nickname);
      console.log("snapshot", snapshot.val());
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input name="nickname" />
      <SubmitButton loading={api.loading}>{t("chat.find-user")}</SubmitButton>
      <Warning message={api.error} />
    </form>
      <div className="flex flex-col gap-3 mt-5">
        {api.data && ( {/* Display data if it has data */}
          <ul className="list-disc pl-5">
            {Object.entries(api.data).map(([key, user]) => (
              <li key={key}>
                <button
                  onClick={() => router.push(`/chat/${user.id}`)}
                  className="text-blue-500 hover:underline"
                >
                  {user.nickname}
                </button>
              </li>
            ))}
          </ul>
        )}
        {api.empty && ( {/* Display empty message */}
          <p className="text-gray-500">{t("chat.no-user-found")}</p>
        )}
      </div>
  );
}
```
