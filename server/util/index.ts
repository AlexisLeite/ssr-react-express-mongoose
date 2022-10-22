import chalk from 'chalk';

/**
 * Convierte un valor a número, si este casteo produce un
 * NaN, devuelve el defaultValue.
 */
export function noNaN(value: unknown, defaultValue = 0) {
  const castedToNumber = Number(value);
  if (isNaN(castedToNumber)) return defaultValue;
  return castedToNumber;
}

/**
 * Se usa para mostrar el texto con un color apropiado para
 * información en la consola.
 */
export function info(text: string) {
  console.log(chalk.cyan(text));
}

/**
 * Se utiliza para dejar en claron en la consola que hay un
 * método o funcionalidad que debe ser implementada.
 */
export function todo(text: string) {
  console.log('');
  console.log(chalk.yellow(`TODO: ${text}`));
  console.log('');
}

export function replacePlaceholders(text: string, placeholders: Record<string, unknown>) {
  let newText = text;
  Object.entries(placeholders).forEach(([key, value]) => {
    newText = newText.replaceAll(`{{${key}}}`, String(value));
  });
  return newText;
}
