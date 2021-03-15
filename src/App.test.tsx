import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { wrapComp } from './App';
import { Button, Collapse, Divider, Text } from '@blueprintjs/core';

function testSimple(element: React.ReactElement, expected: string) {
  test('', () => expect(render(element).container.innerHTML).toEqual(expected))
}

export const Row = wrapComp("div", "flex");
export const RowReverse = wrapComp(Row, "flex-row-reverse space-x-reverse");
export const Col = wrapComp(Row, "flex-col");
export const ColReverse = wrapComp(Row, "flex-col-reverse space-y-reverse");

testSimple(<Row />, '<div class="flex"></div>')
testSimple(<RowReverse />, '<div class="flex flex-row-reverse space-x-reverse"></div>')
testSimple(<Col />, '<div class="flex flex-col"></div>')
testSimple(<ColReverse />, '<div class="flex flex-col-reverse space-y-reverse"></div>')

export const TextWithExtras = wrapComp(Text, p => p.ellipsize ? "x-ellipsize" : "x-raw");

testSimple(
  <TextWithExtras ellipsize={false}>content</TextWithExtras>,
  "<div class=\"x-raw\">content</div>"
)
testSimple(
  <TextWithExtras ellipsize={true}>content</TextWithExtras>,
  "<div class=\"bp3-text-overflow-ellipsis x-ellipsize\">content</div>"
)

// Giving default props doesn't yet work: The object argument's prop values are sometimes too broad (string) or too narrow ("trash").
//export const Input = wrapComp(Icon, { icon: "trash" })
