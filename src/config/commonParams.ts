const commonParams = {
  // ...
}

export function getCommonParams() {
  const { userInfo } = useStore('user')
  return {
    ...commonParams,
    token: userInfo.value.token,
  }
}
