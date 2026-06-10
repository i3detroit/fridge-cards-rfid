<script lang="ts">
    import { SimpleKeyboard as Keyboard } from 'simple-keyboard';
    import 'simple-keyboard/build/css/index.css';

    const { type, ...props } = $props();

    let keyboard: Keyboard;
    let input = $state();

    $effect(() => {
        keyboard = new Keyboard({
            onChange: input => onChange(input),
            onKeyPress: button => onKeyPress(button),
            layout: {
                default: [
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "{shift} z x c v b n m {backspace}",
                    "{numbers} {space} {enter}"
                ],
                shift: [
                    "Q W E R T Y U I O P",
                    "A S D F G H J K L",
                    "{shift} Z X C V B N M {backspace}",
                    "{numbers} {space} {enter}"
                ],
                numbers: [
                    "1 2 3",
                    "4 5 6",
                    "7 8 9",
                    "{letters} 0 {backspace}"
                ],
                numeric: [
                    "1 2 3",
                    "4 5 6",
                    "7 8 9",
                    ". 0 {backspace}"
                ]
            },
            layoutName: type == 'number' ? 'numeric' : 'shift',
            display: {
                '{backspace}': 'backspace',
                '{enter}': 'enter',
                '{shift}': 'shift',
                '{space}': ' ',
                '{letters}': 'abc',
                '{numbers}': '123'
            },
            syncInstanceInputs: true
        });

        const onChange = newValue => input.value = newValue;

        const onKeyPress = button => {
            keyboard.dispatch(instance => {
                if (button == "{shift}" && instance.options.layoutName == 'default') {
                    instance.setOptions({ layoutName: 'shift' });
                } else if (button == "{numbers}") {
                    instance.setOptions({ layoutName: 'numbers' });
                } else if (button == "{letters}" || instance.options.layoutName == 'shift') {
                    instance.setOptions({ layoutName: 'default' });
                }
            });
        };
    });
</script>

<input {...props} bind:this={input} />
<div class="simple-keyboard"></div>

<style>
    :global {
        .simple-keyboard {
            position: absolute;
            inset: auto 0 0 0;
            color: #111;
            z-index: 1;
        }

        .hg-theme-default {
            .hg-button {
                height: 48px;
            }

            .hg-button:not(.hg-standardBtn, .hg-button-space) {
                background: #f5f5f5;
            }

            .hg-button-space {
                flex-grow: 3;
            }
        }
    }
</style>