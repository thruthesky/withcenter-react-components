/**
 * Check if the file is an image based on its extension.
 *
 * @param file The file name or path to check.
 * @returns True if the file is an image, false otherwise.
 */
export function is_image(file: string): boolean {
  // 파일 이름에 .jpg, .jpeg, .png, .gif, .bmp, .webp 확장자가 있는지 확인
  // 대소문자 구분 없이 확인
  // 예) test.jpg, test.JPG, test.Jpg
  const re = /\.(jpg|jpeg|png|gif|bmp|webp)/i.test(file);
  if (re) return re;

  // 만약, 파일 이름에 확장자가 없고, 모두 숫자로만 되어져 있다면, 기존 필고 첨부 파일로 인식하고, 이미지로 인식한다.
  // 예) 1234567890
  const filename = file.split("/").pop();
  if (filename && /^\d+$/.test(filename)) {
    return true;
  }
  return re;
}

/**
 * Generates a random string of the specified length.
 *
 * @param length The length of the random string to generate.
 * @returns A random string of the specified length.
 *
 * @example
 * ```typescript
 * const randomStr = generateRandomString(10);
 * console.log(randomStr); // Example output: "aB3dE5gH1j"
 * ```
 */
export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * HTML FORM 을 전송하면, event handler 에서 받는 e 를 통해서 FormData 를 가져온다.
 *
 * @param e HTMLFormElement
 * @returns FormData as specified type
 *
 * @example
 * ```typescript
 * async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
 * const { name, content } = fromFormData<{ name: string; content: string }>(e);
 * console.log(content); // content from the form
 * }
 * ```
 *
 */
export function fromFormData<T>(e: React.FormEvent<HTMLFormElement>): T {
  return Object.fromEntries(new FormData(e.currentTarget)) as T;
}

/**
 * Returns the text from the HTML content.
 *
 * It removes all the HTML tags and returns the text only.
 *
 * @param html HTML content
 * @returns text from the HTML content
 *
 * @example Refer to the {@link src/tests/functions/strip_tags.spec.ts} for the tests.
 */
export function strip_tags(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}

/**
 * Returns the text from the HTML content.
 *
 * - remove_html_tags() only removes the HTML tags. It does not remove the non-breaking spaces.
 * - That's why 'strip_html()' is created to remove the non-breaking spaces as well.
 *
 * @param text text that may contain the HTML tags.
 * @returns {string} text without the HTML tags.
 */
export function strip_html(text: string): string {
  text = remove_html_tags(text);
  text = remove_nbsps(text);
  return text;
}

/**
 * Remove all the HTML tags from the text.
 *
 * @param {string} text text to remove the HTML tags.
 * @returns {string} text without the HTML tags.
 */
export function remove_html_tags(text: string): string {
  return strip_tags(text);
}

/**
 * Remove the non-breaking spaces from the text.
 *
 * @param {string} text text to remove the non-breaking spaces.
 * @returns {string} text without the non-breaking spaces.
 */
export function remove_nbsps(text: string): string {
  return text.replace(/&nbsp;/g, " ");
}

/**
 * Cut the text with the length and padding.
 *
 * @param text text to cut
 * @param length length to cut from the beginning of the text. If the text is shorter than the length, then return the original text. If the text is longer than the length, then return the text with the padding.
 * @param padding string to add at the end of the text if the text is longer than the length.
 * @returns text with the padding if the text is longer than the length.
 *
 * @example
 * ```typescript
 * cut('Hello, World!', 5, '...'); // Hello...
 * {cut(login.name, 10, { pad: "" })}
 * ```
 */
export function cut(
  text: string | undefined,
  length: number,
  options?: { pad?: string; defaultValue?: string }
): string {
  const { pad, defaultValue } = Object.assign(
    { pad: "...", defaultValue: "..." },
    options
  );
  if (!text) return defaultValue;
  if (text.length > length) {
    return text.substring(0, length) + pad;
  }
  return text;
}

/**
 * Get the locale date and time in current timezone in short format.
 *
 * If the date is today, then return the time only in "HH:mm" format without seconds but including "AM/PM".
 * - For instance, if the local is
 *   - ko-KR, then it will return "오후 3:30"
 *   - en-US, then it will return "3:30 PM"
 *   - en-GB, then it will return "16:30" (24-hour format)
 *
 * If the date is not today, then return the date only in Year, month, and date format.
 * For instance, if the local is
 *   - ko-KR, then it will return "21. 10. 30."
 *   - en-US, then it will return "10/30/21"
 *   - en-GB, then it will return "30/10/21"
 *
 *
 * @param timestamp If it is a string of a date with GMT timezone. If it is a number, then it is a timestamp.
 * @returns {string} short date time
 */
export function shortDateTime(timestamp: string | number): string {
  const date = new Date(timestamp);

  const now = new Date();
  if (date.getDate() == now.getDate()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }
}

/**
 * Returns the very short date time without the year.
 * @param timestamp same as shortDateTime
 * @returns {string} very short date time without the year.
 *
 * @example
 * ```typescript
 * veryShortDateTime('2021-10-30T15:30:00Z'); // 15:30
 * veryShortDateTime('2021-10-29T15:30:00Z'); // 10/29
 * ```
 */
export function veryShortDateTime(timestamp: string | number): string {
  const date = new Date(timestamp);

  const now = new Date();
  if (date.getDate() == now.getDate()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleString([], { month: "2-digit", day: "2-digit" });
  }
}

/**
 * Returns the long date time in the current timezone.
 *
 * @param timestamp as same as shortDateTime
 * @returns {stirng} long date time
 *
 * Note, the returned date time is in the current timezone. Meaning, if your webbrowser is in the ko-KR timezone, then it will return in Korean like "25. 01. 07. 오후 07:44"
 */
export function longDateTime(timestamp: string | number): string {
  return new Date(timestamp).toLocaleString([], {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * It returns with the second in the long date time.
 *
 * @param timestamp same as longDateTime
 * @returns {string} very long date time
 *
 * Note, the returned date time is in the current timezone. Meaning, if your webbrowser is in the ko-KR timezone, then it will return in Korean like "25. 01. 07. 오후 07:44:30"
 */
export function veryLongDateTime(timestamp: string | number): string {
  //  console.log("--> timestamp", timestamp);
  return new Date(timestamp).toLocaleString([], {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
