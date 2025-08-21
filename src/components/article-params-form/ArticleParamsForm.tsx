import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text/Text';

// Интрефейс для типизации пропсов, передававемых в форму
interface initialStateFormProps {
	initialState: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset?: () => void;
}

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: initialStateFormProps) => {
	// Создаем место для хранения предворительных настроек модального окна
	const [isOpen, setIsOpen] = useState(false);

	// Создаем место для хранения новых параметров страницы
	const [newArticleState, setNewArticleState] =
		useState<ArticleStateType>(initialState);

	// Синхронизируем изменения
	useEffect(() => {
		setNewArticleState(initialState);
	}, [initialState]);

	// Применяем параметры только здесь
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(newArticleState);
	};

	// Полный сброс к дефолтным значениям
	const handleFullReset = () => {
		onReset?.();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={newArticleState.fontFamilyOption}
						onChange={(value) =>
							setNewArticleState((prev) => ({
								...prev,
								fontFamilyOption: value,
							}))
						}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={newArticleState.fontSizeOption}
						name='radio'
						onChange={(value) =>
							setNewArticleState((prev) => ({ ...prev, fontSizeOption: value }))
						}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={newArticleState.fontColor}
						onChange={(value) =>
							setNewArticleState((prev) => ({ ...prev, fontColor: value }))
						}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={newArticleState.backgroundColor}
						onChange={(value) =>
							setNewArticleState((prev) => ({
								...prev,
								backgroundColor: value,
							}))
						}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={newArticleState.contentWidth}
						onChange={(value) =>
							setNewArticleState((prev) => ({ ...prev, contentWidth: value }))
						}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFullReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
