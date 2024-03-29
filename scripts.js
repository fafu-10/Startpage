/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"vXkXf3mJVT6byCLY","label":"School","bookmarks":[{"id":"BHlt7L1hfyBEkXqr","label":"Login","url":"https://student.myillini.illinois.edu/"},{"id":"NNS1dcvSqZGE8cPr","label":"Outlook","url":"https://outlook.live.com/owa/"},{"id":"e6n4BAzaJgcCLbq7","label":"Moodle","url":"https://learn.illinois.edu/auth/saml2sso/gateway.php"},{"id":"6ykptqFrQKNFb5dw","label":"Canvas","url":"https://canvas.illinois.edu/"}]},{"id":"UX1v2NLi44FGqCXk","label":"Other","bookmarks":[{"id":"WZrnUfYG0aLCXehl","label":"r/unixporn","url":"https://safereddit.com/r/unixporn/"},{"id":"dFJ8d3fNJOjBPYUX","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"tvSexK1zomOxZOw4","label":"Monkeytype","url":"https://monkeytype.com/"},{"id":"t2mCC1D2OZV8ezVm","label":"Aniwave","url":"https://aniwave.to/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
