import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as includes from 'lodash.includes';
import * as findLastIndex from 'lodash.findlastindex';
import { BACKSPACE, DELETE, LEFT_ARROW, overWriteCharAtPosition, RIGHT_ARROW, SPECIAL_CHARACTERS, TAB } from './mask.utils';
import { maskDigitValidators, neverValidator } from './digit_validators';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {

  @Input('au-mask')
  mask = '';

  input: HTMLInputElement;

  constructor(el: ElementRef) {

    this.input = el.nativeElement;

   }

  ngOnInit(): void {
    this.input.value = this.buildPlaceHolder();
  }

  @HostListener("keydown", ['$event', '$event.keyCode'])
  onKeyDown($event: KeyboardEvent, keyCode) {

    if (keyCode !== TAB) {
      $event.preventDefault();
    }

    const key = String.fromCharCode(keyCode);
    const cursorPos = this.input.selectionStart;

    switch(keyCode) {

      case LEFT_ARROW:
        this.handleLeftArrow(cursorPos);

        return;
      
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);

        return;

      case BACKSPACE:
        this.handleBackspace(cursorPos);

        return;

      case DELETE:
        this.handleDelete(cursorPos);

        return;
    }

    const maskDigit = this.mask.charAt(cursorPos);
    const digitValidator = maskDigitValidators[maskDigit] || neverValidator;

    if (digitValidator(key)) {
      overWriteCharAtPosition(this.input, cursorPos, key);
      this.handleRightArrow(cursorPos);
    }

  }

  handleBackspace(cursorPos) {
    const previousPos = this.calculatePreviousCursorPosition(cursorPos);

    if (previousPos >= 0) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  handleDelete(cursorPos) {
    overWriteCharAtPosition(this.input, cursorPos, '_');
    this.input.setSelectionRange(cursorPos, cursorPos);
  }

  handleLeftArrow(cursorPos) {
    const previousPos = this.calculatePreviousCursorPosition(cursorPos);

    if (previousPos >= 0) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  calculatePreviousCursorPosition(cursorPos) {
    const valueBeforeCursor = this.input.value.slice(0, cursorPos);
    return findLastIndex(valueBeforeCursor, char => ! includes(SPECIAL_CHARACTERS, char));
  }

  handleRightArrow(cursorPos) {
    const valueAfterCursor = this.input.value.slice(cursorPos + 1);
    const nextPos = 
      findLastIndex(valueAfterCursor, char => ! includes(SPECIAL_CHARACTERS, char));

    if (nextPos >= 0) {
      const newCursorPos = cursorPos + nextPos + 1;
      this.input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  buildPlaceHolder(): string {

    const chars = this.mask.split('');

    const value = chars.reduce((result, char) => {
      return result +=
        includes(SPECIAL_CHARACTERS, char) ? char : "_";
    }, '');

    return value;
  }
}
