import {Operator} from '@api/dto/Operator';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {OperatorIcon} from '@service/dto/OperatorIcon';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';
import {TvOrRadioIcon} from "@service/dto/TvOrRadioIcon";
import {PostIcon} from "@service/dto/PostIcon";

/**
 * Конструирование операторских иконок
 */
export abstract class OperatorIconsFactory {
  /**
   * Получение списка иконок технических возможностей с учетом существующих операторов
   * и операторов представленных в локации
   * @param operators все существующие операторы предоставляющие тех. возможности(например операторы интернета)
   * @param technicalCapabilities существующие технические возможности локации или чего-либо еще
   * @param type тип технической возможности (например, интернет)
   */
  abstract operatorIcons(operators: Operator[],
                         technicalCapabilities: ShortTechnicalCapability[],
                         type: TechnicalCapabilityType): OperatorIcon[];

  abstract cellularIcons(operators: Operator[],
                         technicalCapabilities: ShortTechnicalCapability[],
                         type: TechnicalCapabilityType): CellularIcon[];

  abstract internetIcons(operators: Operator[],
                         technicalCapabilities: ShortTechnicalCapability[],
                         type: TechnicalCapabilityType): InternetIcon[];

  abstract tvOrRadioIcons(operators: Operator[],
                          technicalCapabilities: ShortTechnicalCapability[],
                          type: TechnicalCapabilityType): TvOrRadioIcon[];

  abstract postIcons(operators: Operator[],
                     technicalCapabilities: ShortTechnicalCapability[],
                     type: TechnicalCapabilityType): PostIcon[];
}

