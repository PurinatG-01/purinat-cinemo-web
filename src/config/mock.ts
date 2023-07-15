export const loginJwtList = [
  {
    username: "cinemo@1",
    password: "1111",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpbmVtb0AxIiwidXNlcklkIjoxfQ.DgQidH9ILTHfG4xbRpll-kMUmDXBVf9VC4Ddgkexr-E",
  },
  {
    username: "cinemo@2",
    password: "2222",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpbmVtb0AyIiwidXNlcklkIjoyfQ.klUeLX0jYy55Sdj_3BjkiTciBeLigsc4KLKTQWCGsSc",
  },
]

export const validateLogin = (username: string, password: string) => {
  return loginJwtList.find(
    (item) => item.username === username && item.password === password
  )
}
