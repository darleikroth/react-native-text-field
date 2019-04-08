# react-native-text-field

### Install

```
npm i --save @iume/react-native-text-field
```
or
```
yarn add @iume/react-native-text-field
```

### Properties

Name | Description | Type | Default
--- | --- | --- | ---
`type` | Set `text` to use as TextInput. If `view` is selected, the field will not editable. Default value is `text`. | `text` \| `view` | `text`
`underlineColor` | The underline color when the field is not focused. | `string` | `rgba(0, 0, 0, .12)`
`underlineColorFocused` | The underline color when the field is focused. | `string` | `rgba(0, 0, 0, .38)`
`underlineWidth` | The underline width when the field is not focused. | `number` | `1`
`underlineWidthFocused` | The underline width when the field is focused. | `number` | `1.5`
`inputRef` | Ref for the TextInput. | `React.Ref<TextInput>` |
`containerStyle` | Style for fields container. | `ViewStyle` |
`style` | Style for TextInput and Text. | `TextStyle` |
`activeOpacity` | Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.5. | `number` | `0.5`
`elementRight` | Render an element at right side. | `JSX.Element` |
`disabled` | Disables the element. | `boolean` | `false`
`onPress` | Called when the touch is released. This event is just available if `type` property is set to `view`. |