declare namespace GetTest {
  interface params {
    a: number
    isLoading?: boolean
  }
  interface data {
    name: string
    age: number
  }
}

declare namespace PostTest {
  interface params {
    a: number
  }
  interface data {
    val: string
  }
}
