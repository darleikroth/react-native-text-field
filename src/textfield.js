import React from 'react'
import {
  TextInputProperties,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInput,
  Platform,
  View,
  Text,
} from 'react-native'

interface Props extends TextInputProperties {
  /**
   * Set `text` to use as TextInput. If `view` is selected, the field will not editable.
   * Default value is `text`.
   */
  type?: 'text' | 'view';
  /**
   * The underline color when the field is not focused.
   */
  underlineColor?: string;
  /**
   * The underline color when the field is focused.
   */
  underlineColorFocused?: string;
  /**
   * The underline width when the field is not focused.
   */
  underlineWidth?: number;
  /**
   * The underline width when the field is focused.
   */
  underlineWidthFocused?: number;
  /**
   * Ref for the TextInput.
   */
  inputRef?: React.Ref<TextInput>;
  /**
   * Style for fields container.
   */
  containerStyle?: ViewStyle;
  /**
   * Style for TextInput and Text.
   */
  style?: TextStyle;
  /**
   * Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.5.
   */
  activeOpacity?: number;
  /**
   * Render an element at right side.
   */
  elementRight?: React.ReactNode;
  /**
   * Disables the element.
   */
  disabled: boolean;
  /**
   * Called when the touch is released.
   * This event is just available if `type` property is set to `view`.
   */
  onPress?: () => void;
}
const IOS = Platform.OS === 'ios'

export default class TextField extends React.PureComponent<Props> {
  static defaultProps: Props = {
    type: 'text',
    placeholder: '',
    placeholderTextColor: 'rgba(0, 0, 0, .38)',
    selectionColor: 'rgba(0, 0, 0, .38)',
    underlineColor: 'rgba(0, 0, 0, .12)',
    underlineColorFocused: 'rgba(0, 0, 0, .38)',
    underlineWidth: 1,
    underlineWidthFocused: 1.5,
    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    activeOpacity: 0.5,
    disabled: false
  }

  state = {
    inputFocused: false,
  }

  handleOnFocus = () => {
    this.setState({inputFocused: true})
    !!this.props.onFocus && this.props.onFocus()
  }

  handleOnBlur = () => {
    this.setState({inputFocused: false})
    !!this.props.onBlur && this.props.onBlur()
  }

  getBorderStyle = () => {
    const focused = this.state.inputFocused
    const {
      underlineColor,
      underlineColorFocused,
      underlineWidth,
      underlineWidthFocused,
    } = this.props

    return {
      borderBottomColor: focused ? underlineColorFocused : underlineColor,
      borderBottomWidth: focused ? underlineWidthFocused : underlineWidth,
    }
  }

  getTextStyle = () => {
    const textStyle = this.props.style
    if (!this.props.value) {
      textStyle.color = this.props.placeholderTextColor
    }
    return textStyle
  }

  render() {
    if (this.props.type === 'text') {
      return this.renderInput()
    }
    return this.renderField()
  }

  renderInput() {
    const borderStyle = this.getBorderStyle(),
          opacity = this.props.disabled ? 0.5 : 1
    return (
      <View style={[styles.inputContainer, this.props.containerStyle, borderStyle, {opacity}]} >
        <TextInput
          {...this.props}
          ref={this.props.inputRef}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          style={this.props.style}
          editable={!this.props.disabled}
        />
        {this.renderRight()}
      </View>
    )
  }

  renderField() {
    const {placeholder, value, onPress, activeOpacity, disabled} = this.props,
          borderStyle = this.getBorderStyle(),
          textStyle = this.getTextStyle(),
          opacity = this.props.disabled ? 0.5 : 1
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} disabled={disabled} >
        <View style={[styles.fieldContainer, this.props.containerStyle, borderStyle, {opacity}]} >
          <Text style={textStyle} >
            {!value ? placeholder : value}
          </Text>
          {this.renderRight()}
        </View>
      </TouchableOpacity>
    )
  }

  renderRight() {
    if (React.isValidElement(this.props.elementRight)) {
      return (
        <View style={styles.right} >
          {this.props.elementRight}
        </View>
      )
    }
  }
}

const baseContainer = {
  width: '100%',
  marginTop: 10,
  marginBottom: 4,
}

const styles = StyleSheet.create({
  inputContainer: {
    ...baseContainer,
    paddingVertical: IOS ? 9 : undefined,
    paddingHorizontal: IOS ? 4 : undefined,
  },
  fieldContainer: {
    ...baseContainer,
    paddingVertical: IOS ? 9 : 11,
    paddingHorizontal: 4,
  },
  right: {
    flex: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 4, top: 0, bottom: 0,
  }
})
