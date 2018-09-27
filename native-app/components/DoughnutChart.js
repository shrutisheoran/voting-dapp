import React from 'react';
import { View, Text } from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { VictoryPie } from 'victory-native';
import { Svg, Text as SvgText } from 'react-native-svg';
import { scale } from '../utils/scale';
import { Card } from 'native-base'
import { AppLoading } from 'expo';

export default class DoughnutChart extends RkComponent {
  state = {
    selected: 0,
    data: []
  };
  size = 300;
  fontSize = 15;

  componentDidMount() {
    const candidates = this.props.navigation.getParam('candidates')
    const colors = ['#ff6b5d', '#8b98ff', '#c2d521', '#ffd147']
    const data = candidates.map((candidate, index) => ({
        x: candidate[0],
        y: candidate[2],
        title: `${candidate[1]}: ${candidate[2]}`,
        name: candidate[1],
        color: colors[index],
    }));
    this.setState({data})
  }

  computeColors = () => this.state.data.map(i => i.color);

  onPeopleChartPressed = (event, props) => {
    this.setState({
      selected: props.index,
    });
  };

  renderMarkdown = () => this.state.data.map(this.renderMarkdownItem);

  renderMarkdownItem = (item) => (
    <View key={item.name} style={styles.legendItem}>
      <View style={[styles.itemBadge, { backgroundColor: item.color }]} />
      <RkText rkType="primary3">{item.name}</RkText>
    </View>
  );

  render() {
    if(this.state.data.length)
      return (
        <View style={styles.container}>
          <Text style={{fontFamily: 'FjallaOne', fontSize: 40, marginTop: 40}}>ELECTION RESULTS</Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20}}>
        <Card style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
            <Text></Text>
            <View style={{ alignSelf: 'center' }}>
              <Svg width={scale(this.size)} height={scale(this.size)}>
                <VictoryPie
                  labels={[]}
                  width={scale(this.size)}
                  height={scale(this.size)}
                  colorScale={this.computeColors()}
                  data={this.state.data}
                  standalone={false}
                  padding={scale(25)}
                  innerRadius={scale(70)}
                  events={[{
                    target: 'data',
                    eventHandlers: {
                      onPressIn: this.onPeopleChartPressed,
                    },
                  }]}
                />
                <SvgText
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={scale(this.size / 2)}
                  y={scale(this.size / 2)}
                  height={scale(this.fontSize)}
                  fontSize={scale(this.fontSize)}
                  // fontFamily={RkTheme.current.fonts.family.regular}
                  // stroke={RkTheme.current.colors.text.base}
                  // fill={RkTheme.current.colors.text.base}
                  >
                  {this.state.data[this.state.selected].title}
                </SvgText>
              </Svg>
            </View>
            <View style={styles.legendContainer}>
              {this.renderMarkdown()}
            </View>
          </Card>
        </View>
        </View>
      )
      else
        return (<AppLoading/>)
  }
}

const styles = RkStyleSheet.create(() => ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
}));