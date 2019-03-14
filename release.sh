echo
printf "Releease checklist"
echo
read  -n 1 -p "Has http://vue.carbondesignsystem.com been sucessfully deployed with the updates [yN]? " answer1
[ -z "$answer1" ] && answer1="n"  # if 'no' have to be default choice

if [ "$answer1" != "y" ] && [ "$answer1" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has package.json version been updated [yN]? " answer2
[ -z "$answer2" ] && answer2="n"  # if 'no' have to be default choice

if [ "$answer2" != "y" ] && [ "$answer2" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Have README.md and CHAGNELOG.MD been updated. [yN]? " answer3
[ -z "$answer3" ] && answer3="n"  # if 'no' have to be default choice

if [ "$answer3" != "y" ] && [ "$answer3" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has package.json and Readme.md been pushed and merged [yN]? " answer4
[ -z "$answer4" ] && answer4="n"  # if 'no' have to be default choice

if [ "$answer4" != "y" ] && [ "$answer4" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has 'yarn lint:es' been run [yN]? " answer6
[ -z "$answer6" ] && answer6="n"  # if 'no' have to be default choice

if [ "$answer6" != "y" ] && [ "$answer6" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has 'yarn lint:css' been run [yN]? " answer6b
[ -z "$answer6b" ] && answer6b="n"  # if 'no' have to be default choice

if [ "$answer6b" != "y" ] && [ "$answer6b" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has 'yarn test:unit' been run [yN]? " answer7
[ -z "$answer7" ] && answer7="n"  # if 'no' have to be default choice

if [ "$answer7" != "y" ] && [ "$answer7" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has 'yarn storybook-build' been run [yN]? " answer8
[ -z "$answer8" ] && answer8="n"  # if 'no' have to be default choice

if [ "$answer8" != "y" ] && [ "$answer8" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has 'yarn build' been run [yN]? " answer9
[ -z "$answer9" ] && answer9="n"  # if 'no' have to be default choice

if [ "$answer9" != "y" ] && [ "$answer9" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Has a tag for the new version been set and pushed upstream [yN]? " answer5
[ -z "$answer5" ] && answer5="n"  # if 'no' have to be default choice

if [ "$answer5" != "y" ] && [ "$answer5" != "Y" ]
then
  exit;
fi
echo

read  -n 1 -p "Have you run 'npm pack' and are happy with its contents [yN]? " answer10
[ -z "$answer10" ] && answer10="n"  # if 'no' have to be default choice

if [ "$answer10" != "y" ] && [ "$answer10" != "Y" ]
then
  exit;
fi
echo
echo Well run 'npm publish'

read  -n 1 -p "After publishing does https://codepen.io/lee-chase/pen/bzLWyb look ok [yN]? " answer11
[ -z "$answer11" ] && answer11="n"  # if 'no' have to be default choice

if [ "$answer11" != "y" ] && [ "$answer11" != "Y" ]
then
  exit;
fi
