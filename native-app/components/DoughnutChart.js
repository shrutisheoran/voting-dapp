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
import * as api from '../utils/utils'

export default class DoughnutChart extends RkComponent {
  state = {
    selected: 0,
    data: [],
    candidates: []
  };
  size = 300;
  fontSize = 15;

  componentDidMount() {
    const image_URLs = [
      "https://images.vexels.com/media/users/3/136532/isolated/preview/93b5c734e3776dd11f18ca2c42c54000-owl-round-icon-by-vexels.png",
      "http://clipart-library.com/images/LTdojebac.jpg",
      "https://cdn4.iconfinder.com/data/icons/school-education-14/512/Icon_51-512.png",
      "https://images-na.ssl-images-amazon.com/images/I/51Mwpo7I72L._SX425_.jpg"
    ]
    api.getVotes().then(data => this.setState({
      candidates: data.map((d, index) => {
        d.push(image_URLs[index])
        return d;
      })
    }, () =>{
      const { candidates } = this.state
      const colors = ['#ff6b5d', '#8b98ff', '#c2d521', '#ffd147']
      const data = candidates.map((candidate, index) => ({
          x: candidate[0],
          y: candidate[2],
          title: `${candidate[1]}: ${candidate[2]}`,
          name: candidate[1],
          color: colors[index],
      }));
      this.setState({data})
    }));
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